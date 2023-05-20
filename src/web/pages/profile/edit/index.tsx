import React from "react"
import { UpdateProfile } from "../../../ui-elements/profile/update/UpdateProfile"
import { Profile } from "../../../../domain/profiles"
import useProfile from "../../../../services/hooks/profile/useProfile"

export default function UpdateProfilePage() {
  const { data, isLoading } = useProfile() as {
    data: Profile
    isLoading: boolean
  }

  return (
    <div className="container">
      {!data && !isLoading && <div>No profile found.</div>}
      {data && !isLoading && <UpdateProfile profile={data} />}
    </div>
  )
}
