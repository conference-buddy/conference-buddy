import React from "react"
import { PageLayout } from "../../page-templates/wrapper-layout/PageLayout"
import { UserProfile } from "../../domain/profile/UserProfile"
import useProfile from "../../services/hooks/profile/useProfile"
import { CreateProfile } from "../../domain/profile/create/CreateProfile"
import { ProfilePrivate } from "../../domain/profile/profile-interface"
import { useAuthUser } from "../../services/hooks/auth-user/useAuthUser"

export default function ProfilePage() {
  const user = useAuthUser()

  const { data, isLoading } = useProfile() as {
    data: ProfilePrivate
    isLoading: boolean
  }

  const createProfile = user ? (
    <PageLayout title="Create ProfilePrivate">
      <CreateProfile authUser={user} />
    </PageLayout>
  ) : null

  const profile = (
    <PageLayout title="Your ProfilePrivate">
      <UserProfile />
    </PageLayout>
  )
  const somethingWentWrong = (
    <PageLayout title="Ooops">
      <div>You need to be logged in to see your profile.</div>
    </PageLayout>
  )

  const userNeedsProfile = user && !data
  const userIsLoggedOut = !user

  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : userNeedsProfile ? (
        createProfile
      ) : userIsLoggedOut ? (
        somethingWentWrong
      ) : (
        profile
      )}
    </>
  )
}
