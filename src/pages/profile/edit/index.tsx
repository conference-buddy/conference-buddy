import React from "react"
import { PageLayout } from "../../../ui-elements/page-layout/PageLayout"
import { UpdateProfile } from "../../../domain/profile/update/UpdateProfile"
import useProfile from "../../../services/hooks/profile/useProfile"
import { Profile } from "../../../domain/profile/profile-interface"

export default function UpdateProfilePage() {
  const { data, isLoading } = useProfile() as {
    data: Profile
    isLoading: boolean
  }

  return (
    <PageLayout title="Profile">
      <div className="container">
        <h2>Edit profile</h2>
        {!data && !isLoading && <div>No profile found.</div>}
        {data && !isLoading && <UpdateProfile profile={data} />}
      </div>
    </PageLayout>
  )
}
