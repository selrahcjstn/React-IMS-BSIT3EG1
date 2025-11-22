import { useEffect, useMemo, useState, useCallback } from "react"
import AuthContext from "./AuthContext"
import { auth, database } from "../firebase/config"
import { ref, onValue, update } from "firebase/database"
import {
  onIdTokenChanged,
  signOut,
  updateProfile,
} from "firebase/auth"

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)  // whole user node
  const [avatarId, setAvatarId] = useState(null)

  useEffect(() => {
    let first = true
    let userProfileUnsub = null

    const unsubscribe = onIdTokenChanged(auth, (user) => {
      setCurrentUser(user || null)

      if (user && user.uid) {
        const userRef = ref(database, `users/${user.uid}`)

        if (userProfileUnsub) {
          userProfileUnsub()
          userProfileUnsub = null
        }

        userProfileUnsub = onValue(
          userRef,
          async (snap) => {
            const data = snap.val() || {}
            setProfile(data)

            let nextAvatarId = data.avatarId ?? null

            const firstName = (data.firstName || "").trim()
            const lastName = (data.lastName || "").trim()

            // Default avatar if user has a name but no avatarId
            if (nextAvatarId == null && (firstName || lastName)) {
              nextAvatarId = 1
              try {
                await update(userRef, { avatarId: 1 })
              } catch (e) {
                console.error("Failed to set default avatarId:", e)
              }
            }

            setAvatarId(nextAvatarId)
          },
          (err) => {
            console.error("Error loading user profile:", err)
          }
        )
      } else {
        if (userProfileUnsub) {
          userProfileUnsub()
          userProfileUnsub = null
        }
        setProfile(null)
        setAvatarId(null)
      }

      if (first) {
        setLoading(false)
        first = false
      }
    })

    return () => {
      unsubscribe()
      if (userProfileUnsub) userProfileUnsub()
    }
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
      profile,     // full profile from DB
      avatarId,    // canonical avatar id
      setAvatarId, // let screens optimistically update context
      refreshUser,
      setUserDisplayName,
      logout,
      loading,
    }),
    [currentUser, profile, avatarId, refreshUser, setUserDisplayName, loading]
  )

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}