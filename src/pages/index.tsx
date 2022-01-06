import React, { ReactElement } from "react"
import { WrapperLayout } from "../page-templates/wrapper-layout/WrapperLayout"
import { graphql, useStaticQuery } from "gatsby"
import { Conference } from "../domain/conference/conference-interface"
import { StartPageTemplate } from "../page-templates/start-page/StartPageTemplate"

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
      <WrapperLayout title="Conference Buddy">
        <StartPageTemplate conferences={data.allConference.nodes} />
      </WrapperLayout>
    </div>
  )
}
