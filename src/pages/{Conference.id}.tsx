import React, { FunctionComponent } from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/layout/Layout"
import ConferenceTemplate from "../components/conference/ConferenceTemplate"
import { Conference } from "src/domain/conference/conference-interface"

const Conference: FunctionComponent<{ data: { conference: Conference } }> = ({
  data,
}) => (
  <Layout title="Conference Detail View">
    <ConferenceTemplate {...data.conference} />
  </Layout>
)

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
