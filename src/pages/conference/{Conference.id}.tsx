import React from "react"
import { graphql } from "gatsby"
import { WrapperLayout } from "../../page-templates/wrapper-layout/WrapperLayout"
import { ConferenceSinglePageTemplate } from "../../page-templates/conference-single/ConferenceSinglePageTemplate"
import { Conference } from "../../domain/conference/conference-interface"

interface ConferencePageProps {
  data: { conference: Conference }
}

const ConferenceSinglePage = (props: ConferencePageProps) => {
  return (
    <WrapperLayout title="Conference Detail View">
      <ConferenceSinglePageTemplate {...props.data} />
    </WrapperLayout>
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
