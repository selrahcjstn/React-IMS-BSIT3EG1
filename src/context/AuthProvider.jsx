import { useState, useEffect } from "react";
import AuthContext from "./AuthContext"; 
import {auth} from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser: currentUser,
    uid: currentUser ? currentUser.uid : null,
    email: currentUser ? currentUser.email : null,
    isLoggedIn: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}