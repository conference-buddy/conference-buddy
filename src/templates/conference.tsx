import React, { FunctionComponent } from "react"
import { graphql } from "gatsby"

const ConferenceTemplate: FunctionComponent<{
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        date: string
        path: string
        title: string
      }
    }
  }
}> = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export default ConferenceTemplate

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
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
`
