import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import "./contact.css";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const url = Server_URL + "users/contact";
      const response = await axios.post(url, data);
      showSuccessToast(
        "Your message has been sent! We will get back to you soon."
      );
      reset();
    } catch (error) {
      console.error(error);
      showErrorToast(
        "There was a problem sending your message. Please try again later."
      );
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-container">
          <h1>Contact Us</h1>
          <p>
            We're here to help with any questions about our library services
          </p>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="contact-container">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <FiMapPin className="contact-icon" size={28} />
              <h3>Visit Us</h3>
              <p>
                123 College Avenue
                <br />
                Academic City, AC 12345
              </p>
            </div>
            <div className="contact-info-card">
              <FiMail className="contact-icon" size={28} />
              <h3>Email Us</h3>
              <p>
                library@college.edu
                <br />
                support@college.edu
              </p>
            </div>
            <div className="contact-info-card">
              <FiPhone className="contact-icon" size={28} />
              <h3>Call Us</h3>
              <p>
                (123) 456-7890
                <br />
                Mon-Fri, 8:00 AM - 5:00 PM
              </p>
            </div>
            <div className="contact-info-card">
              <FiClock className="contact-icon" size={28} />
              <h3>Hours</h3>
              <p>
                Mon-Fri: 8:00 AM - 10:00 PM
                <br />
                Sat-Sun: 10:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="contact-container">
          <div className="contact-form-wrapper">
            <div className="contact-form-text">
              <h2>Send Us a Message</h2>
              <p>
                Have questions about our resources, services, or facilities?
                Fill out the form below and our team will get back to you as
                soon as possible.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error">Name is required</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+\.\S+$/,
                  })}
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <span className="error">Valid email is required</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  {...register("subject", { required: true })}
                  id="subject"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="resources">Resource Questions</option>
                  <option value="membership">Membership</option>
                  <option value="events">Event Information</option>
                  <option value="feedback">Feedback/Suggestions</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <span className="error">Subject is required</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  {...register("message", { required: true })}
                  id="message"
                  rows="6"
                  placeholder="Enter your message here..."
                ></textarea>
                {errors.message && (
                  <span className="error">Message is required</span>
                )}
              </div>

              <button type="submit" className="contact-submit-btn">
                <FiSend className="btn-icon" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
