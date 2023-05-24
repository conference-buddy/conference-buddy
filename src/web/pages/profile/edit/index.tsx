import React from "react"
import { UpdateProfile } from "../../../ui-elements/profile/update/UpdateProfile"
import { Profile } from "../../../../domain/profiles"
import useProfile from "../../../../services/hooks/profile/useProfile"
import { PageHead } from "../../../ui-elements/page-layout/PageHead"
import { TextLink } from "../../../ui-elements/text-link/TextLink"

export default function UpdateProfilePage() {
  const { data, isLoading } = useProfile() as {
    data: Profile
    isLoading: boolean
  }

  return (
    <div className="container">
      <div className="mb-3">
        <TextLink internal={true} to={"/"}>
          Home
        </TextLink>
        <span className={"mx-1"}>/</span>
        <TextLink internal={true} to={"/profile"}>
          Profile
        </TextLink>
        <span className={"mx-1"}>/</span>
        <span>Edit</span>
      </div>
      {!data && !isLoading && <div>No profile found.</div>}

      {data && !isLoading && <UpdateProfile profile={data} />}
    </div>
  )
}

export function Head() {
  return <PageHead title={"Edit profile"} />
}
