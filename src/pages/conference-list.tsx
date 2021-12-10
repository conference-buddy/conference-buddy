import React, { ReactElement } from "react"
import { ConferencesListEntry } from "../components/conference/ConferencesListEntry"
import Layout from "../components/layout/Layout"
import { graphql } from "gatsby"
import { Conference } from "../domain/conference/conference-interface"

export default function ConferenceList({
  data,
}: {
  data: {
    allMarkdownRemark: { nodes: Record<"frontmatter", Conference>[] }
  }
}): ReactElement {
  const conferences: Conference[] = data.allMarkdownRemark.nodes.map(
    (entry: { frontmatter: Conference }) => {
      return { ...entry.frontmatter }
    }
  )

  const listItems = conferences.map((conference: Conference, index: number) => {
    return <ConferencesListEntry key={index} conference={conference} />
  })

  return (
    <Layout title="Conference List">
      <div className="container">
        <ul className="list-group">{listItems}</ul>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    allMarkdownRemark {
      nodes {
        frontmatter {
          city
          country
          description
          endDate(formatString: "")
          startDate(formatString: "")
          tags
          title
          url
        }
      }
    }
  }
`
