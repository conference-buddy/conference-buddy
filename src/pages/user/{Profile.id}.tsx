import React from "react"
import { graphql } from "gatsby"
import { Layout } from "../../components/layout/Layout"
import { ProfilePublic } from "../../domain/profile/profile-interface"

interface UserProfilePageProps {
  data: { profile: ProfilePublic }
}

//eslint-disable-next-line
const UserProfilePage = (props: UserProfilePageProps) => {
  console.log(props)
  return (
    <Layout title="Conference Detail View">
      <div>Profile page</div>
      <div>{props.data.profile.name}</div>
    </Layout>
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
export default UserProfilePage
