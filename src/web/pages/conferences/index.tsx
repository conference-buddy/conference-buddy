import React from "react"
import { graphql } from "gatsby"
import { Conference } from "../../../domain/conferences"
import { ConferenceList } from "../../ui-elements/conferences/list/ConferenceList"
import { PageHead } from "../../ui-elements/page-layout/PageHead"

type ConferenceListPage = {
  data: { allConference: { nodes: Conference[] } }
}
export default function ConferenceListPage(props: ConferenceListPage) {
  const conferences = props.data.allConference.nodes

  return (
    <>
      <div className="container">
        <h1>Conference List</h1>
        <p>
          If you want to be a Conference Buddy at one of these conferences,
          visit the details page. There you can click the button 🐶 and leave a
          comment.
        </p>
        <ConferenceList conferences={conferences} />
      </div>
    </>
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
