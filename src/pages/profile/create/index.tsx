import React from "react"
import { CreateProfile } from "../../../domain/profile/create/CreateProfile"
import { PageLayout } from "../../../ui-elements/page-layout/PageLayout"

export default function CreateProfilePage() {
  return (
    <PageLayout title="Profile">
      <div className="mb-5">
        <h2>Create new Profile</h2>
        <CreateProfile />
      </div>
    </PageLayout>
  )
}
