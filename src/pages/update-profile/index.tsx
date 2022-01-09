import React from "react"
import { PageLayout } from "../../ui-elements/page-layout/PageLayout"
import useProfile from "../../services/hooks/profile/useProfile"
import { Profile } from "../../domain/profile/profile-interface"
import { UpdateProfile } from "../../domain/profile/update/UpdateProfile"

export default function UpdateProfilePage() {
  const { data, isLoading } = useProfile() as {
    data: Profile
    isLoading: boolean
  }

  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <PageLayout title="Create Profile">
          <UpdateProfile profile={data} />
        </PageLayout>
      )}
    </>
  )
}
