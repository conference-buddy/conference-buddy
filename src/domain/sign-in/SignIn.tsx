import React, { ReactElement } from "react"
import { TextLink } from "../../ui-elements/text-link/TextLink"
import useProfile from "../../services/hooks/profile/useProfile"
import useAuthUserContext from "../../services/hooks/auth-user/useAuthUserContext"
import { supabase } from "../../services/database/supabaseClient"

function SignIn(): ReactElement {
  const { user } = useAuthUserContext()
  const { data, isLoading } = useProfile()

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

  return user ? (
    <div>
      {!isLoading && !data ? (
        <TextLink
          to={`/profile/create`}
          internal={true}
          light={true}
          additionalClasses="me-3"
        >
          Create Profile
        </TextLink>
      ) : (
        <TextLink
          to={`/profile`}
          internal={true}
          light={true}
          additionalClasses="me-3"
        >
          Profile
        </TextLink>
      )}
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
