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
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

function handleAuthUserEvents(callback: authUserEventCallback) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(callback)
  return () => {
    subscription?.unsubscribe()
  }
}

async function signInWithGithub() {
  return await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.href}`,
    },
  })
}

async function signOut() {
  await supabase.auth.signOut()
}

export { getAuthUser, handleAuthUserEvents, signInWithGithub, signOut }
