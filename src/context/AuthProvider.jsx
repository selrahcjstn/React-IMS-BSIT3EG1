import { useEffect, useMemo, useState, useCallback } from "react"
import AuthContext from "./AuthContext"
import { auth } from "../firebase/config"
import {
  onIdTokenChanged,
  signOut,
  updateProfile
} from "firebase/auth"


export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let first = true
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      setCurrentUser(user || null)
      if (first) {
        setLoading(false)
        first = false
      }
    })
    return unsubscribe
  }, [])

  
  const refreshUser = useCallback(async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload()
      setCurrentUser({ ...auth.currentUser })
    }
  }, [])

  const setUserDisplayName = useCallback(
    async (displayName) => {
      if (!auth.currentUser) return
      await updateProfile(auth.currentUser, { displayName })
      await refreshUser()
    },
    [refreshUser]
  )

  const logout = async () => {
    await signOut(auth)
  }

  const value = useMemo(
    () => ({
      currentUser,
      uid: currentUser ? currentUser.uid : null,
      email: currentUser ? currentUser.email : null,
      displayName: currentUser ? currentUser.displayName || null : null,
      photoURL: currentUser ? currentUser.photoURL || null : null,
      emailVerified: currentUser ? currentUser.emailVerified || false : false,
      isLoggedIn: !!currentUser,
      refreshUser,
      setUserDisplayName,
      logout,
      loading
    }),
    [currentUser, refreshUser, setUserDisplayName, loading]
  )

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}