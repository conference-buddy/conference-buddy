import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react"
import { User } from "@supabase/supabase-js"
import { getAuthUser } from "../../domain/auth-user"
import { handleAuthUserEvents } from "../../domain/auth-user/api/auth-user-api"

//eslint-disable-next-line
export const AuthUserContext = createContext<{
  authUser: User | null
  isLoading: boolean
}>({
  authUser: null,
  isLoading: false,
})

export function AuthUserProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function initAuth() {
      setIsLoading(true)
      const authUser = await getAuthUser()
      setAuthUser(authUser)
      setIsLoading(false)
    }
    initAuth()

    handleAuthUserEvents(async (event, session) => {
      console.log("event", event)
      console.log("session", session)
      setAuthUser(session?.user ?? null)
    })
  }, [])

  const memoedValue = useMemo(
    () => ({
      authUser,
      isLoading,
    }),
    [authUser, isLoading]
  )

  return (
    <AuthUserContext.Provider value={memoedValue}>
      {children}
    </AuthUserContext.Provider>
  )
}
