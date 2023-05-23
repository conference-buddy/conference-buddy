import React, { ReactElement } from "react"
import { signOut } from "../../../domain/auth-user/api/auth-user-api"
import { useAuthUserContext } from "../../../services/hooks/auth-user/useAuthUserContext"
import { Link } from "gatsby"

function SignIn({ standAlone }: { standAlone?: boolean }): ReactElement {
  const { authUser, isLoading: isLoadingAuthUser } = useAuthUserContext()

  if (isLoadingAuthUser) {
    return (
      <div
        className="small spinner-border spinner-border-sm text-light"
        role="status"
      >
        <span className="visually-hidden">Loading authentication status</span>
      </div>
    )
  }

  if (!authUser) {
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
    <button className="btn btn-outline-light btn-sm" onClick={signOut}>
      Sign out
    </button>
  )
}
export { SignIn }
