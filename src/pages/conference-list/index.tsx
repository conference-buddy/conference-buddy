import React, { ReactElement } from "react"
import { PageLayout } from "../../ui-elements/page-layout/PageLayout"
import { Conference } from "../../domain/conference/conference-interface"
import { useStaticQuery, graphql } from "gatsby"
import { ConferenceList } from "../../domain/conference/list/ConferenceList"

export default function ConferenceListPage(): ReactElement {
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

  return (
    <PageLayout title="Conference List">
      <ConferenceList conferences={data.allConference.nodes} />
    </PageLayout>
  )
}
