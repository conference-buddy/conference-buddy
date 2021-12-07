import React from "react"
import { graphql } from "gatsby"
import { FunctionComponent } from "react"

const ConferenceTemplate: FunctionComponent<{
  data: {
    markdownRemark: {
      html: any
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
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
