import React from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { PublicProfile } from "../../../domain/public-profiles"

type UserPageProps = {
  data: { user: PublicProfile }
}

const UserPage = (props: UserPageProps) => {
  return (
    <>
      <div className="container p-5">
        <h1>Meet your fellow Conference Buddy</h1>
      </div>
      <div className="container p-5 bg-white mb-3">
        <h2 className="text-center">{props?.data?.user?.name}</h2>
        <hr className="text-confbuddy-pink" />
        <div className="row pt-4">
          <div className="col-4">
            <StaticImage
              src={`../../assets/images/avatar_placeholder.png`}
              alt={"placeholder"}
              placeholder="blurred"
            />
          </div>
          <div className="col-8">
            <>about text</>
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
    </>
  )
}

export const query = graphql`
  query ($username: String) {
    user(username: { eq: $username }) {
      about_text
      name
      about_text
      social_links {
        platform
        platformName
        address
      }
      username
    }
  }
`
export default UserPage
