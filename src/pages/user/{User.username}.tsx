import React from "react"
import { graphql } from "gatsby"
import { PageLayout } from "../../ui-elements/page-layout/PageLayout"
import { ProfilePublic } from "../../domain/profile/profile-interface"

type UserPageProps = {
  data: { user: ProfilePublic }
}

const UserPage = (props: UserPageProps) => {
  return (
    <PageLayout title="Conference Detail View">
      <div className="container">
        <h1>{props.data.user.name} profile page</h1>
      </div>
    </PageLayout>
  )
}

export const query = graphql`
  query ($username: String) {
    user(username: { eq: $username }) {
      name
      username
    }
  }
`
export default UserPage
