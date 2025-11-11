import "./social.css";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../../../firebase/config";
import { getDatabase, ref, get } from "firebase/database";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function Social({ setError }) {
  const navigate = useNavigate();

  const handleSocialLogin = async (provider) => {
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const db = getDatabase();
      const userRef = ref(db, "users/" + user.uid);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        navigate("/auth/personal-info");
      }
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        setError(
          "This email is already linked to another login method. Please sign in using the original method."
        );
      } else {
        setError("Social login failed. " + error.message);
      }
    }
  };

  return (
    <div className="register__social">
      <div className="register__divider">
        <span className="register__divider-text">or</span>
      </div>

      <button
        type="button"
        className="register__social-btn google"
        onClick={() => handleSocialLogin(googleProvider)}
        aria-label="Continue with Google"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google logo"
          loading="lazy"
        />
        <span>Continue with Google</span>
      </button>

      <button
        type="button"
        className="register__social-btn facebook"
        onClick={() => handleSocialLogin(facebookProvider)}
        aria-label="Continue with Facebook"
      >
        <img
          src="https://www.svgrepo.com/show/475647/facebook-color.svg"
          alt="Facebook logo"
          loading="lazy"
        />
        <span>Continue with Facebook</span>
      </button>
    </div>
  );
}

export default Social;