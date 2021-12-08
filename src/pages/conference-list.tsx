import React from "react"
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
                endDate(formatString: "MMMM DD, YYYY")
                path
                startDate(formatString: "MMMM DD, YYYY")
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
    return { title: entry.node.frontmatter.title, date: entry.node.frontmatter.date }
  })

console.log(conferences)

  const listItems = conferences.map((conference: any[], index: number) => {
    //@ts-ignore
    return <ConferencesListEntry title={conference.title} date={conference.date} key={index} />
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
