import React, { ReactElement } from "react"
import { TextLink } from "../text-link/TextLink"
import useProfile from "../../services/hooks/profile/useProfile"
import useAuthUserContext from "../../services/hooks/auth-user/useAuthUserContext"
import {
  signInWithGithub,
  signOut,
} from "../../../domain/auth-user/api/auth-user-api"

function SignIn(): ReactElement {
  const { authUser } = useAuthUserContext()
  const { data, isLoading } = useProfile()

  return authUser ? (
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
