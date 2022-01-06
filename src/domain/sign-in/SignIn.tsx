import React, { ReactElement } from "react"
import { useAuthUser } from "../../services/hooks/auth-user/useAuthUser"
import { supabase } from "../../services/database/supabaseClient"
import { TextLink } from "../../ui-elements/text-link/TextLink"

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
    <div>
      <TextLink
        to="/profile"
        internal={false}
        light={true}
        additionalClasses="me-3"
      >
        Profile
      </TextLink>
      <button className="btn btn-outline-light btn-sm" onClick={signOut}>
        Sign out
      </button>
    </div>
  ) : (
    <button className="btn btn-outline-light btn-sm" onClick={signInWithGithub}>
      Sign In
    </button>
  )
}
export { SignIn }
