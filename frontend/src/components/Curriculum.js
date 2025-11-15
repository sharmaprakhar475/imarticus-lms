import React, { useEffect, useState } from "react";
import axios from "axios";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Curriculum() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data.courses || []);
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleBuyNow = async (course) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      window.location.href = "/login";
      return;
    }

    const user = await axios.get(
      `http://localhost:5000/api/auth/getUser/${userId}`
    );

    const res = await loadRazorpayScript();

    if (!res) {
      alert("Failed to load Razorpay SDK. Please check your connection.");
      return;
    }

    try {
      // 1. Create order on backend
      const orderRes = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          courseId: course._id,
          userId,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      const { orderId, amount, currency } = orderRes.data;

      // 2. Setup Razorpay options
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
        amount: amount.toString(), // in paise (e.g., 50000 paise = ₹500)
        currency: currency,
        name: "MyApp Courses",
        description: `Purchase: ${course.name}`,
        order_id: orderId,
        handler: async function (response) {
          // Payment successful callback
          try {
            await axios.post(
              "http://localhost:5000/api/payment/verify",
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                courseId: course._id,
                userId,
              },
              {
                headers: { Authorization: localStorage.getItem("token") },
              }
            );

            alert("Payment successful! Course assigned.");
            // Optionally refresh courses or redirect
          } catch (error) {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#0f5644",
        },
      };

      // 3. Open Razorpay modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert("Error initiating payment. Please try again.");
    }
  };

  if (loading) {
    return (
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="mb-4">Program Curriculum</h2>
          <p>Loading courses...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="mb-4">Program Curriculum</h2>
          <p className="text-danger">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="mb-5 text-center fw-bold display-5">
          Program Curriculum
        </h2>
        <div className="row g-4">
          {courses.length === 0 && (
            <p className="text-muted text-center">No courses available.</p>
          )}

          {courses.map((course) => {
            const chaptersCount = course.chapters?.length || 0;
            const lecturesCount = course.chapters
              ? course.chapters.reduce(
                  (acc, ch) => acc + (ch.lectures?.length || 0),
                  0
                )
              : 0;
            const quizzesCount = course.chapters
              ? course.chapters.reduce(
                  (acc, ch) => acc + (ch.quiz?.length || 0),
                  0
                )
              : 0;
            const price = course.price || 0;

            return (
              <div className="col-md-6 col-lg-4" key={course._id}>
                <div className="card h-100 shadow border-0 rounded-4">
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    className="card-img-top rounded-top-4"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{course.name}</h5>
                    <p className="card-text text-muted mb-3">
                      <span className="me-3">
                        <strong>{chaptersCount}</strong> Chapters
                      </span>
                      <span className="me-3">
                        <strong>{lecturesCount}</strong> Lectures
                      </span>
                      <span>
                        <strong>{quizzesCount}</strong> Quizzes
                      </span>
                    </p>

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <div className="fs-5 fw-semibold text-success">
                        ₹{price.toLocaleString("en-IN")}
                      </div>
                      <button
                        className="btn btn-primary px-4 shadow-sm"
                        onClick={() => handleBuyNow(course)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
