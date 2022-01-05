import React, { ReactElement } from "react"
import { useAuthUser } from "../../services/hooks/auth-user/useAuthUser"
import { supabase } from "../../services/database/supabaseClient"

function SignIn(): ReactElement {
  const user = useAuthUser()

  async function signInWithGithub() {
    await supabase.auth.signIn(
      {
        provider: "github",
      },
      {
        redirectTo: `${window.location.origin}/profile`,
      }
    )
  }
  async function signOut() {
    await supabase.auth.signOut()
  }
  return user ? (
    <button type="button" className="btn btn-light" onClick={signOut}>
      Sign out
    </button>
  ) : (
    <button type="button" className="btn btn-light" onClick={signInWithGithub}>
      Sign In
    </button>
  )
}
export { SignIn }
