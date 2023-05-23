import React, { ReactElement } from "react"
import { TextLink } from "../text-link/TextLink"
import { signOut } from "../../../domain/auth-user/api/auth-user-api"
import { useAuthUserContext } from "../../../services/hooks/auth-user/useAuthUserContext"
import useProfile from "../../../services/hooks/profile/useProfile"
import { Link } from "gatsby"

function SignIn({ standAlone }: { standAlone?: boolean }): ReactElement {
  const { authUser, isLoading: isLoadingAuthUser } = useAuthUserContext()
  const { data: profile, isLoading: isLoadingProfile } = useProfile()

  if (isLoadingAuthUser || isLoadingProfile) {
    return (
      <div
        className="small spinner-border spinner-border-sm text-light"
        role="status"
      >
        <span className="visually-hidden">Loading authentication status</span>
      </div>
    )
  }

  if (!authUser || isLoadingProfile) {
    return (
      <Link
        className={`btn btn-sm  ${
          !standAlone ? "btn-outline-light " : "btn-primary"
        }`}
        to={"/signin"}
      >
        Sign in
      </Link>
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
