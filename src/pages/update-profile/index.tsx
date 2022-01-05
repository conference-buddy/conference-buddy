import React from "react"
import { PageLayout } from "../../ui-elements/page-layout/PageLayout"
import useProfile from "../../services/hooks/profile/useProfile"
import { ProfilePrivate } from "../../domain/profile/profile-interface"
import { UpdateProfile } from "../../domain/profile/update/UpdateProfile"

export default function UpdateProfilePage() {
  const { data, isLoading } = useProfile() as {
    data: ProfilePrivate
    isLoading: boolean
  }

  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <PageLayout title="Create ProfilePrivate">
          <UpdateProfile profile={data} />
        </PageLayout>
      )}
    </>
  )
}
