import React, { ReactElement } from "react"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import { useAuthUserContext } from "../../../services/hooks/auth-user/useAuthUserContext"
import { navigate } from "gatsby"
import { signInWithProvider } from "../../../domain/auth-user/api/auth-user-api"
import { IconBrandGithub, IconBrandGitlab } from "@tabler/icons-react"

export default function SignInPage(): ReactElement {
  const { authUser, isLoading } = useAuthUserContext()

  if (!isLoading && authUser) {
    navigate("/")
    return <></>
  }
  return (
    <div className="container text-center">
      <h1>Sign in</h1>
      <p>Choose your provider to sign in.</p>
      <div className={"row mt-3"}>
        <button
          className={
            "btn btn-dark btn-lg col-8 offset-2 col-md-6 offset-md-3 mt-4"
          }
          onClick={() => signInWithProvider("github")}
        >
          <IconBrandGithub color="white" aria-hidden="true" /> GitHub
        </button>

        <button
          className={
            "btn btn-dark btn-lg  col-8 offset-2 col-md-6 offset-md-3 mt-4"
          }
          onClick={() => signInWithProvider("gitlab")}
        >
          <IconBrandGitlab color="#fc6d26" aria-hidden="true" /> GitLab
        </button>
      </div>
    </div>
  )
}

export function Head() {
  return <PageHead title={"Welcome"} />
}
