import React from "react"
import { Layout } from "../components/layout/Layout"
import { UserProfile } from "../components/profile/UserProfile"
import { isSSR } from "../utils/isSSR"

export default function ProfilePage() {
  if (isSSR) return null
  return (
    <Layout title="Your Profile">
      <UserProfile />
    </Layout>
  )
}
