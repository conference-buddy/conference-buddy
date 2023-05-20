import React from "react"
import { graphql } from "gatsby"
import { TextLink } from "../../ui-elements/text-link/TextLink"
import { ConferenceSingle } from "../../ui-elements/conferences/single/ConferenceSingle"
import { Conference } from "../../../domain/conferences"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import { BuddyPostList } from "../../ui-elements/buddy-posts/BuddyPosts"

type ConferencePageProps = {
  data: { conference: Conference }
}

export function Head() {
  return (
    <div>
      <PageHead title={"Conference Detail View"} />
    </div>
  )
}

const ConferenceSinglePage = (props: ConferencePageProps) => {
  const conference = props.data.conference
  return (
    <div className="container">
      <div className="mb-3">
        <TextLink internal={true} to={"/conferences"}>
          &larr; Back to Conferences
        </TextLink>
      </div>
      <ConferenceSingle conference={conference} />
      <BuddyPostList conferenceId={props.data.conference.id} />
    </div>
  )
}

export const query = graphql`
  query ($id: String) {
    conference(id: { eq: $id }) {
      id
      name
      city
      country
      description
      end_date
      start_date
      url
    }
  }
`

export default ConferenceSinglePage
