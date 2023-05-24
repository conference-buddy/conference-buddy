import {
  AuthChangeEvent,
  Provider,
  Session,
  User as SupaBaseUser,
} from "@supabase/supabase-js"
import { supabase } from "../../_database/supabaseClient"

type authUserEventCallback = {
  (_event: AuthChangeEvent, session: Session | null): void
}

async function getAuthUser(): Promise<SupaBaseUser | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session || !session.user) {
    return null
  }
  return session.user
}

function handleAuthUserEvents(callback: authUserEventCallback) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(callback)
  return () => {
    subscription?.unsubscribe()
  }
}

type AvailableProvider = "github" | "gitlab"

async function signInWithProvider(availableProvider: AvailableProvider) {
  const provider: Provider = availableProvider
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/profile`,
    },
  })
}

async function signOut() {
  await supabase.auth.signOut()
}

export { getAuthUser, handleAuthUserEvents, signInWithProvider, signOut }
