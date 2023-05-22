import React, { ReactElement } from "react"
import { TextLink } from "../text-link/TextLink"
import {
  signInWithGithub,
  signOut,
} from "../../../domain/auth-user/api/auth-user-api"
import { useAuthUserContext } from "../../../services/hooks/auth-user/useAuthUserContext"
import useProfile from "../../../services/hooks/profile/useProfile"

function SignIn({ standAlone }: { standAlone?: boolean }): ReactElement {
  const { authUser } = useAuthUserContext()

  //@TODO add proper error handling
  const { data: profile, isLoading: isLoadingProfile } = useProfile()

  if (!authUser || isLoadingProfile) {
    return (
      <button
        className={`btn btn-sm  ${
          !standAlone ? "btn-outline-light " : "btn-primary"
        }`}
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
          Create profile
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
