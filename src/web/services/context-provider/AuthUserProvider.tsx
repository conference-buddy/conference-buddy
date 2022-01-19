import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react"
import { User as SupaBaseUser } from "@supabase/supabase-js"
import {
  getAuthUser,
  handleAuthUserEvents,
} from "../../../domain/auth-user/api/auth-user-api"

//eslint-disable-next-line
export const AuthUserContext = createContext<any>({})

export function AuthUserProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState<SupaBaseUser | null>(null)
  useEffect(() => {
    async function initAuth() {
      const authUser = await getAuthUser()
      //eslint-disable-next-line
      //@ts-ignore
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
