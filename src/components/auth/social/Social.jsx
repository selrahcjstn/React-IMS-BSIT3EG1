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
        <span>or</span>
      </div>

      <button
        type="button"
        className="register__social-btn google"
        onClick={() => handleSocialLogin(googleProvider)}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
        />
        Continue with Google
      </button>

      <button
        type="button"
        className="register__social-btn facebook"
        onClick={() => handleSocialLogin(facebookProvider)}
      >
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