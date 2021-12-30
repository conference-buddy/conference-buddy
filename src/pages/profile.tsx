import React from "react"
import { Layout } from "../components/layout/Layout"
import { UserProfile } from "../components/profile/UserProfile"

export default function ProfilePage() {
  return (
    <Layout title="Your Profile">
      <UserProfile />
    </Layout>
  )
}
