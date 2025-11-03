import "./social.css"

function Social() {
  return (
    <div className="register__social">
      <div className="register__divider">
        <span>or</span>
      </div>

      <button type="button" className="register__social-btn google">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
        />
        Continue with Google
      </button>
      <button type="button" className="register__social-btn facebook">
        <img
          src="https://www.svgrepo.com/show/475647/facebook-color.svg"
          alt="Facebook"
        />
        Continue with Facebook
      </button>
    </div>
  );
}

export default Social;
