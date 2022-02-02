import React from "react"
import { graphql } from "gatsby"
import { PageLayout } from "../../ui-elements/page-layout/PageLayout"
import { StaticImage } from "gatsby-plugin-image"
import { TextLink } from "../../ui-elements/text-link/TextLink"
import { PublicProfile } from "../../../domain/public-profiles"

type UserPageProps = {
  data: { user: PublicProfile }
}

const UserPage = (props: UserPageProps) => {
  return (
    <PageLayout title="Conference Detail View">
      <div className="container p-5">
        <h1>Meet your fellow Conference Buddy</h1>
      </div>
      <div className="container p-5 bg-white mb-3">
        <h2 className="text-center">{props.data.user.name}</h2>
        <hr className="text-confbuddy-pink" />
        <div className="row pt-4">
          <div className="col-4">
            <StaticImage
              src={`../../assets/images/profilepicplaceholder.png`}
              alt={"placeholder"}
              placeholder="blurred"
            />
          </div>
          <div className="col-8">
            <h2>About me</h2>
            <p>
              This is a placeholder text for {props.data.user.name} profile
              page.{" "}
            </p>
            <h3>You can find me</h3>
            <ul>
              <li>
                <TextLink to="">website</TextLink>
              </li>
              <li>
                <TextLink to="">github</TextLink>
              </li>
              <li>
                <TextLink to="">gitlab</TextLink>
              </li>
              <li>
                <TextLink to="">twitter</TextLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container bg-white">
        <div className="row">
          <div className="col p-5">
            <h3>NEXT: I'm a 🐶 Buddy at:</h3>
            <li>Conference name</li>
            <li>Conference name</li>
            <li>Conference name</li>
          </div>
          <div className="col p-5">
            <h3>Previous was a 🐶 Buddy at:</h3>
            <li>Conference name</li>
            <li>Conference name</li>
            <li>Conference name</li>
          </div>
        </div>
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
