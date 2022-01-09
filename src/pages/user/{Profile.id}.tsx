import React from "react"
import { graphql } from "gatsby"
import { PageLayout } from "../../ui-elements/page-layout/PageLayout"
import { ProfilePublic } from "../../domain/profile/profile-interface"

type ProfilePageProps = {
  data: { profile: ProfilePublic }
}

const ProfilePage = (props: ProfilePageProps) => {
  console.log(props)
  return (
    <PageLayout title="Conference Detail View">
      <div className="container">
        <h1>{props.data.profile.name} profile page</h1>
      </div>
    </PageLayout>
  )
}

export const query = graphql`
  query ($id: String) {
    profile(id: { eq: $id }) {
      name
      username
    }
  }
`
export default ProfilePage
