import React from "react"
import { Layout } from "../components/layout/Layout"
import { UserProfile } from "../components/profile/UserProfile"
import useProfile from "../hooks/useProfile"
import { CreateProfile } from "../components/profile/CreateProfile"
import { ProfilePrivate } from "../domain/profile/profile-interface"
import { useAuthUser } from "../hooks/useAuthUser"

export default function ProfilePage() {
  const user = useAuthUser()
  const { data, isLoading } = useProfile() as {
    data: ProfilePrivate
    isLoading: boolean
  }

  const createProfile = user ? (
    <Layout title="Create ProfilePrivate">
      <CreateProfile authUser={user} />
    </Layout>
  ) : null

  const profile = (
    <Layout title="Your ProfilePrivate">
      <UserProfile />
    </Layout>
  )
  const somethingWentWrong = (
    <Layout title="Ooops">
      <div>You need to be logged in to see your profile.</div>
    </Layout>
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
