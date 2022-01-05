import React from "react"
import { Layout } from "../components/layout/Layout"
import useProfile from "../hooks/useProfile"
import { Profile } from "../domain/profile/profile-interface"
import { UpdateProfile } from "../domain/profile/UpdateProfile"

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
        <Layout title="Create Profile">
          <UpdateProfile profile={data} />
        </Layout>
      )}
    </>
  )
}
