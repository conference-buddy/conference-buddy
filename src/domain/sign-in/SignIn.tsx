import React, { ReactElement } from "react"
import { useAuthUser } from "../../services/hooks/auth-user/useAuthUser"
import { supabase } from "../../services/database/supabaseClient"
import { TextButton } from "../../ui-elements/text-button/TextButton"

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
    <TextButton handleClick={signOut} light={true}>
      Sign out
    </TextButton>
  ) : (
    <TextButton handleClick={signInWithGithub} light={true}>
      Sign In
    </TextButton>
  )
}
export { SignIn }
