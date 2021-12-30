import React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/layout/Layout"
import ConferenceTemplate from "../components/conference/ConferenceTemplate"

const Conference = ({ data }) => {
  return (
    <Layout title="Conference Detail View">
      <ConferenceTemplate {...data.conference} />
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

export default Conference
