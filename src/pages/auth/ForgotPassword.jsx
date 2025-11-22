import { useState } from "react";
import "./forgot-password.css"; 
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setIsLoading(true); 

    try {
      const auth = getAuth(); 
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (err) {
      setError(
        err?.code === "auth/user-not-found"
          ? "No account found with that email."
          : "Failed to send reset email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">

        <div className="forgot-password-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h2 className="forgot-password-title">Forgot Password?</h2>
        <p className="forgot-password-desc">
          No worries! Enter your email and we'll send you reset instructions.
        </p>

        {submitted ? (
          <div className="forgot-password-success">
            <div className="success-icon">✓</div>
            <span>Check your email for the reset link!</span>
          </div>
        ) : (
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <div className="forgot-password-field">
              <label htmlFor="email" className="forgot-password-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`forgot-password-input ${error ? "input-error" : ""}`}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if(error) setError(""); 
                }}
                autoFocus
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <div className="forgot-password-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="forgot-password-btn"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="forgot-password-footer">
           <Link to="/auth/login" className="back-to-login">
            ← Back to Login
            </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;