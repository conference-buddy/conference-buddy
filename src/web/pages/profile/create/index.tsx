import React from "react"
import { CreateProfile } from "../../../ui-elements/profile/create/CreateProfile"
import useProfile from "../../../../services/hooks/profile/useProfile"
import { navigate } from "gatsby"
import { useAuthUserContext } from "../../../../services/hooks/auth-user/useAuthUserContext"
import { PageHead } from "../../../ui-elements/page-layout/PageHead"
import { TextLink } from "../../../ui-elements/text-link/TextLink"

export default function CreateProfilePage() {
  const { data: profile, isLoading: profileIsLoading } = useProfile()
  const { authUser, isLoading: authUserIsLoading } = useAuthUserContext()

  if (!authUserIsLoading && !authUser) {
    navigate("/")
    return
  }

  if (!profileIsLoading && profile) {
    navigate("/")
    return
  }

  return (
    <div className="container">
      <div className="mb-3">
        <TextLink internal={true} to={"/"}>
          Home
        </TextLink>
        <span className={"mx-1"}>/</span>
        <span>Create profile</span>
      </div>

      <h1>Create profile</h1>
      <p>
        💜 Thank you for joining Conference Buddy! Add as much information as
        you feel comfortable with.
      </p>

      <div>{authUser && !profile && <CreateProfile authUser={authUser} />}</div>
    </div>
  )
}

export function Head() {
  return <PageHead title={"Create profile"} />
}
