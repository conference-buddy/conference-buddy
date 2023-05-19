import React, { ReactElement } from "react"
import { TextLink } from "../text-link/TextLink"
import {
  signInWithGithub,
  signOut,
} from "../../../domain/auth-user/api/auth-user-api"
import { useAuthUserContext } from "../../../services/hooks/auth-user/useAuthUserContext"

function SignIn(): ReactElement {
  const test = useAuthUserContext()
  const authUser = test.authUser

  //@todo get profile api etc
  const profile = false

  if (!authUser) {
    return (
      <button
        className="btn btn-outline-light btn-sm"
        onClick={signInWithGithub}
      >
        Sign in
      </button>
    )
  }

  return (
    <div>
      {!profile ? (
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
  )
}
export { SignIn }
