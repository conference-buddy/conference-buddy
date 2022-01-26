import {
  AuthChangeEvent,
  Session,
  User as SupaBaseUser,
} from "@supabase/supabase-js"
import { supabase } from "../../_database/supabaseClient"

type authUserEventCallback = {
  (_event: AuthChangeEvent, session: Session | null): void
}

async function getAuthUser(): Promise<SupaBaseUser | null> {
  const user = await supabase.auth.user()
  return user
}

function handleAuthUserEvents(callback: authUserEventCallback) {
  const { data: listener } = supabase.auth.onAuthStateChange(callback)
  return () => {
    listener?.unsubscribe()
  }
}

async function signInWithGithub() {
  await supabase.auth.signIn(
    {
      provider: "github",
    },
    {
      redirectTo: `${window.location}`,
    }
  )
}

async function signOut() {
  await supabase.auth.signOut()
}

export { getAuthUser, handleAuthUserEvents, signInWithGithub, signOut }
