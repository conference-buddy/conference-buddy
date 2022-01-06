import React from "react"
import { WrapperLayout } from "../../page-templates/wrapper-layout/WrapperLayout"
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
        <WrapperLayout title="Create ProfilePrivate">
          <UpdateProfile profile={data} />
        </WrapperLayout>
      )}
    </>
  )
}
