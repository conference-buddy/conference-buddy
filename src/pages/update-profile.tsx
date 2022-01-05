import React from "react"
import { Layout } from "../components/layout/Layout"
import useProfile from "../hooks/useProfile"
import { ProfilePrivate } from "../domain/profile/profile-interface"
import { UpdateProfile } from "../domain/profile/UpdateProfile"

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
        <Layout title="Create ProfilePrivate">
          <UpdateProfile profile={data} />
        </Layout>
      )}
    </>
  )
}
