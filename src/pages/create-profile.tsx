import React from "react"
import { Layout } from "../components/layout/Layout"
import { CreateProfile } from "../components/profile/CreateProfile"
import { isSSR } from "../utils/isSSR"

export default function CreateProfilePage() {
  if (isSSR) return null

  return (
    <Layout title="Create Profile">
      <CreateProfile />
    </Layout>
  )
}
