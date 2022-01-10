import React from "react"
import { graphql } from "gatsby"
import { PageLayout } from "../../ui-elements/page-layout/PageLayout"
import { Conference } from "../../domain/conference/conference-interface"
import { TextLink } from "../../ui-elements/text-link/TextLink"
import { ConferenceSingle } from "../../domain/conference/single/ConferenceSingle"
import { BuddyPostList } from "../../domain/buddy-post/list/BuddyPostList"

type ConferencePageProps = {
  data: { conference: Conference }
}

const ConferenceSinglePage = (props: ConferencePageProps) => {
  return (
    <PageLayout title="Conference Detail View">
      <div className="container">
        <div className="mb-3">
          <TextLink internal={true} to={"/conference-list"}>
            &larr; Back to Conferences
          </TextLink>
        </div>
        <ConferenceSingle conference={props.data.conference} />
        <BuddyPostList conferenceId={props.data.conference.id} />
      </div>
    </PageLayout>
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
