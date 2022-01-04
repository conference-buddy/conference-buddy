import React from "react"
import { graphql } from "gatsby"
import { Layout } from "../../components/layout/Layout"
import ConferenceTemplate from "../../components/conference/ConferenceTemplate"
import { Conference } from "../../domain/conference/conference-interface"

interface ConferencePageProps {
  data: { conference: Conference }
}

const ConferencePage = (props: ConferencePageProps) => {
  return (
    <Layout title="Conference Detail View">
      <ConferenceTemplate {...props.data} />
    </Layout>
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
    }
  }
`

export default ConferencePage
