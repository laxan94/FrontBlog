import { createContext, useState, useCallback } from "react"

const initialJwt =
  typeof window === "undefined" ? null : localStorage.getItem("sessionJwt")

const initialUserId =
  typeof window === "undefined" ? null : localStorage.getItem("sessionUserId")

const initialUserRole =
  typeof window === "undefined" ? null : localStorage.getItem("sessionRole")

export const AppContext = createContext(null)

export const AppContextProvider = (props) => {
  const [jwt, setJwt] = useState(initialJwt)
  const [sessionUserId, setSessionUserId] = useState(initialUserId)
  const [sessionRoleUser, setSessionRoleUser] = useState(initialUserRole)

  const login = useCallback(
    ({ jwt, sessionUserId, userRole: sessionRoleUser }) => {
      localStorage.setItem("sessionJwt", jwt)
      localStorage.setItem("sessionUserId", sessionUserId)
      localStorage.setItem("sessionRole", sessionRoleUser)

      setJwt(jwt)
      setSessionUserId(sessionUserId)
      setSessionRoleUser(sessionRoleUser)
    },
    []
  )

  const logout = useCallback(() => {
    localStorage.removeItem("sessionJwt")
    localStorage.removeItem("sessionUserId")
    localStorage.removeItem("sessionRole")

    setJwt(null)
    setSessionUserId(null)
    setSessionRoleUser(null)
  })

  return (
    <AppContext.Provider
      {...props}
      value={{
        login,
        logout,
        jwt,
        sessionUserId,
        sessionRoleUser,
      }}
    />
  )
}
