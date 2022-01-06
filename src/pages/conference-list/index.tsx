import React, { ReactElement } from "react"
import { PageLayout } from "../../page-templates/wrapper-layout/PageLayout"
import { Conference } from "../../domain/conference/conference-interface"
import { useStaticQuery, graphql } from "gatsby"
import { ConferenceListPageTemplate } from "../../page-templates/conference-list/ConferenceListPageTemplate"

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
      <ConferenceListPageTemplate conferences={data.allConference.nodes} />
    </PageLayout>
  )
}
