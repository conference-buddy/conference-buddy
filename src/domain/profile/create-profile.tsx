import React from "react"
import { Layout } from "../../components/layout/Layout"
import { CreateProfile } from "../../components/profile/CreateProfile"
import { User } from "@supabase/supabase-js"

export default function CreateProfilePage({ authUser }: { authUser: User }) {
  console.log("create profile page")
  console.log(authUser)
  return (
    <Layout title="Create ProfilePrivate">
      <CreateProfile authUser={authUser} />
    </Layout>
  )
}
