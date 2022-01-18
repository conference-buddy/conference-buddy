import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react"
import { User as SupaBaseUser } from "@supabase/supabase-js"
import { supabase } from "../../../domain/database/supabaseClient"

//eslint-disable-next-line
export const AuthUserContext = createContext<any>({})

export function AuthUserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupaBaseUser | null>(null)

  useEffect(() => {
    async function initAuth() {
      const supabaseUser = await supabase.auth.user()
      setUser(supabaseUser)
    }
    initAuth()

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener?.unsubscribe()
    }
  }, [])

  const memoedValue = useMemo(
    () => ({
      user,
    }),
    [user]
  )

  return (
    <AuthUserContext.Provider value={memoedValue}>
      {children}
    </AuthUserContext.Provider>
  )
}
