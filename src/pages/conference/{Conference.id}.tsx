import React from "react"
import { graphql } from "gatsby"
import { PageLayout } from "../../page-templates/wrapper-layout/PageLayout"
import { ConferenceSinglePageTemplate } from "../../page-templates/conference-single/ConferenceSinglePageTemplate"
import { Conference } from "../../domain/conference/conference-interface"

interface ConferencePageProps {
  data: { conference: Conference }
}

const ConferenceSinglePage = (props: ConferencePageProps) => {
  return (
    <PageLayout title="Conference Detail View">
      <ConferenceSinglePageTemplate {...props.data} />
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
