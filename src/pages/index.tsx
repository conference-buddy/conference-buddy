import React, { ReactElement } from "react"
import { PageLayout } from "../ui-elements/page-layout/PageLayout"
import { graphql, useStaticQuery } from "gatsby"
import { Conference } from "../domain/conference/conference-interface"
import { StartPage } from "../ui-elements/start-page/StartPage"

export default function IndexPage(): ReactElement {
  const data: {
    allConference: { nodes: Conference[] }
  } = useStaticQuery(graphql`
    {
      allConference(sort: { fields: start_date, order: ASC }, limit: 3) {
        nodes {
          id
          city
          country
          description
          end_date
          start_date
          url
          name
        }
      }
    }
  `)

  return (
    <div>
      <PageLayout title="Conference Buddy">
        <StartPage conferences={data.allConference.nodes} />
      </PageLayout>
    </div>
  )
}
