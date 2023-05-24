import React from "react"
import { graphql } from "gatsby"
import { TextLink } from "../../ui-elements/text-link/TextLink"
import { ConferenceSingle } from "../../ui-elements/conferences/single/ConferenceSingle"
import { Conference } from "../../../domain/conferences"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import { BuddyPosts } from "../../ui-elements/buddy-posts/BuddyPosts"
import { BecomeABuddy } from "../../ui-elements/buddy-posts/BecomeABuddy"

type ConferencePageProps = {
  data: { conference: Conference }
}

const ConferenceSinglePage = (props: ConferencePageProps) => {
  const conference = props.data.conference
  return (
    <div className="container">
      <div className="mb-3">
        <TextLink internal={true} to={"/"}>
          Home
        </TextLink>
        <span className={"mx-1"}>/</span>
        <TextLink internal={true} to={"/conferences"}>
          Conferences
        </TextLink>
        <span className={"mx-1"}>/</span>
        <span>{conference.name}</span>
      </div>
      <ConferenceSingle conference={conference} />
      <BecomeABuddy conferenceId={conference.id} />
      <BuddyPosts conferenceId={props.data.conference.id} />
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

export function Head() {
  return <PageHead title={"Conference details"} />
}

export default ConferenceSinglePage
