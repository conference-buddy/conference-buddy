import React, { ReactElement } from "react"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import { useAuthUserContext } from "../../../services/hooks/auth-user/useAuthUserContext"
import { navigate } from "gatsby"
import { signInWithProvider } from "../../../domain/auth-user/api/auth-user-api"

const githubIcon = (
  <span aria-hidden={true} className={"me-2"}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  </span>
)

const gitlabIcon = (
  <span aria-hidden={true} className={"me-2"}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      {" "}
      <g>
        {" "}
        <path fill="none" d="M0 0h24v24H0z" />{" "}
        <path
          fillRule="nonzero"
          fill="#fc6d26"
          d="M5.68 7.314l-1.82 5.914L12 19.442l8.14-6.214-1.82-5.914L16.643 11H7.356L5.681 7.314zM15.357 9l2.888-6.354a.4.4 0 0 1 .747.048l3.367 10.945a.5.5 0 0 1-.174.544L12 21.958 1.816 14.183a.5.5 0 0 1-.174-.544L5.009 2.694a.4.4 0 0 1 .747-.048L8.644 9h6.712z"
        />{" "}
      </g>{" "}
    </svg>
  </span>
)

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
          {githubIcon} GitHub
        </button>

        <button
          className={
            "btn btn-dark btn-lg  col-8 offset-2 col-md-6 offset-md-3 mt-4"
          }
          onClick={() => signInWithProvider("gitlab")}
        >
          {gitlabIcon} GitLab
        </button>
      </div>
    </div>
  )
}

export function Head() {
  return <PageHead title={"Welcome"} />
}
