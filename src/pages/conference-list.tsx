import React from 'react'
import { ConferencesListEntry } from "../components/conference/ConferencesListEntry"
import Layout from "../components/layout/Layout"
import { graphql, useStaticQuery } from "gatsby"

export default function ConferenceList() {
  const data = useStaticQuery(graphql`
    query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                city
                country
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
  //@ts-ignore
  const conferences = data?.allMarkdownRemark?.edges.map( entry => {
    return { ...entry.node.frontmatter }
  })

  const listItems = conferences.map((conference: any[], index: number) => {
    //@ts-ignore
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
