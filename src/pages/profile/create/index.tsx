import React from "react"
import { CreateProfile } from "../../../domain/profile/create/CreateProfile"
import { WrapperLayout } from "../../../page-templates/wrapper-layout/WrapperLayout"

export default function CreateProfilePage() {
  return (
    <WrapperLayout title="Profile">
      <div className="mb-5">
        <h2>Create new Profile</h2>
        <CreateProfile />
      </div>
    </WrapperLayout>
  )
}
