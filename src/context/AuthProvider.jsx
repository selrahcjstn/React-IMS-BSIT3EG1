import { useState } from "react";
import AuthContext from "./AuthContext.jsx";

export function AuthProvider({ children }) {
  const [uid, setUid] = useState("");

  const value = {
    uid,
    setUid,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
