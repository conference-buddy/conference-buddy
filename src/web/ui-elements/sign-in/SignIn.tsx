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
    <>
      {!profile ? (
        <li>
          <a href="/profile/create" className="nav-link me-3">
            Create profile
          </a>
        </li>
      ) : (
        <li>
          <a href="/profile" className="nav-link me-3">
            Profile
          </a>
        </li>
      )}
      <button className="btn btn-outline-light btn-sm" onClick={signOut}>
        Sign out
      </button>
    </>
  )
}
export { SignIn }
