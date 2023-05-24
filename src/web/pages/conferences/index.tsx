import React from "react"
import { graphql } from "gatsby"
import { Conference } from "../../../domain/conferences"
import { ConferenceList } from "../../ui-elements/conferences/list/ConferenceList"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import { TextLink } from "../../ui-elements/text-link/TextLink"

type ConferenceListPage = {
  data: { allConference: { nodes: Conference[] } }
}
export default function ConferenceListPage(props: ConferenceListPage) {
  const conferences = props.data.allConference.nodes

  return (
    <div className="container">
      <div className="mb-3">
        <TextLink internal={true} to={"/"}>
          Home
        </TextLink>
        <span className={"mx-1"}>/</span>
        <span>Conferences</span>
      </div>
      <h1>Conferences</h1>
      <p>
        If you want to be a Conference Buddy at one of these conferences, visit
        the details page. There you can become a buddy.
      </p>
      <ConferenceList conferences={conferences} />
    </div>
  )
}

export function Head() {
  return <PageHead title={"All conferences"} />
}

export const query = graphql`
  {
    allConference {
      nodes {
        name
        country
        city
        description
        end_date
        id
        start_date
        url
      }
    }
  }
`
