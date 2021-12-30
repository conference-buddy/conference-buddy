import React, { ReactElement } from "react"
import { Layout } from "../components/layout/Layout"
import { Conference } from "../domain/conference/conference-interface"
import { ConferencesListEntry } from "../components/conference-list/ConferencesListEntry"
import { useStaticQuery, graphql } from "gatsby"

export default function ConferenceList(): ReactElement {
  const data: {
    allConference: { nodes: Conference[] }
  } = useStaticQuery(graphql`
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
  `)

  const listItem = data.allConference.nodes.map(
    (conference: Conference, index: number) => {
      return <ConferencesListEntry key={index} conference={conference} />
    }
  )

  return (
    <Layout title="Conference List">
      <div className="container">
        <ul className="list-group">{listItem}</ul>
      </div>
    </Layout>
  )
}
