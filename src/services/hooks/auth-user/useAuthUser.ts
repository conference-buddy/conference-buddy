import { supabase } from "../../database/supabaseClient"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"

export function useAuthUser(): User | null {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(supabase.auth.user())

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener?.unsubscribe()
    }
  }, [])

  return user
}
