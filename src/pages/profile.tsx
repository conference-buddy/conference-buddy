import React, { ReactElement } from "react"
import { Layout } from "../components/layout/Layout"
import useProfile from "../hooks/useProfile"
import { Profile } from "../domain/profile/profile-interface"

export default function Profile(): ReactElement {
  const { data, isLoading } = useProfile() as {
    data: Profile
    isLoading: boolean
  }

  return (
    <Layout title="Conference List">
      <div className="mb-5">
        <h2>My Profile</h2>
        {isLoading ? null : (
          <>
            <div>{data?.first_name}</div>
            <div>{data?.last_name}</div>
          </>
        )}
      </div>
    </Layout>
  )
}
