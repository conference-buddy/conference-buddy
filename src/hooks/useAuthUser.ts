import { supabase } from "../../supabaseClient"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"

export function useAuthUser(): User | null {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(supabase.auth.user())

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
  }, [])

  return user
}
