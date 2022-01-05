import React from "react"
import { graphql } from "gatsby"
import { PageLayout } from "../../ui-elements/page-layout/PageLayout"
import ConferenceSingleTemplate from "../../domain/conference/single/ConferenceSingleTemplate"
import { Conference } from "../../domain/conference/conference-interface"

interface ConferencePageProps {
  data: { conference: Conference }
}

const ConferenceSinglePage = (props: ConferencePageProps) => {
  return (
    <PageLayout title="Conference Detail View">
      <ConferenceSingleTemplate {...props.data} />
    </PageLayout>
  )
}

export const query = graphql`
  query ($id: String) {
    conference(id: { eq: $id }) {
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
