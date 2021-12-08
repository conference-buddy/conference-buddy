import React from 'react'
import { ConferencesListEntry } from "../components/conference/ConferencesListEntry"
import Layout from "../components/layout/Layout"
import { graphql, useStaticQuery } from "gatsby"
import { Conference } from '../domain/conference/conference-interface'

export default function ConferenceList() {

  const data = useStaticQuery(graphql`
    query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                city
                country
                description
                endDate(formatString: "MMM DD, yyyy")
                path
                startDate(formatString: "MMM DD, yyyy")
                tags
                title
                url
              }
            }
          }
        }
      }
  `)

  const conferences: Conference[] = data.allMarkdownRemark.edges.map( (entry: { node: { frontmatter: Conference }}) => {
    return { ...entry.node.frontmatter }
  })

  const listItems = conferences.map((conference: Conference, index: number) => {
    return <ConferencesListEntry key={index} conference={conference} />
  })

  return (
    <Layout title="Conference List">
      <div className="container">
        <ul className="list-group">
          {listItems}
        </ul>
      </div>
    </Layout>
  )
}
