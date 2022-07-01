import React from "react"
import { PageLayout } from "../../../ui-elements/page-layout/PageLayout"
import { CreateConference } from "../../../ui-elements/conferences/create/CreateConference"

export default function ProfilePage() {
  return (
    <PageLayout title="Submit Conference">
      <div className="container">
        <h2>Submit a new conference</h2>
        <CreateConference />
      </div>
    </PageLayout>
  )
}
