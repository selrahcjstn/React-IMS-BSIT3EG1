import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

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

  // Add logout while keeping your structure intact
  const logout = async () => {
    await signOut(auth);
    // onAuthStateChanged will set currentUser to null automatically
  };

  const value = {
    currentUser,
    uid: currentUser ? currentUser.uid : null,
    email: currentUser ? currentUser.email : null,
    isLoggedIn: !!currentUser,
    logout, // expose logout to consumers
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}