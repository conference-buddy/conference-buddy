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
export const AuthUserContext = createContext<{ authUser: User | null }>({
  authUser: null,
})

export function AuthUserProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState<User | null>(null)
  useEffect(() => {
    async function initAuth() {
      const authUser = await getAuthUser()
      setAuthUser(authUser)
    }
    initAuth()

    handleAuthUserEvents(async (_event, session) => {
      setAuthUser(session?.user ?? null)
    })
  }, [])

  const memoedValue = useMemo(
    () => ({
      authUser,
    }),
    [authUser]
  )

  return (
    <AuthUserContext.Provider value={memoedValue}>
      {children}
    </AuthUserContext.Provider>
  )
}
