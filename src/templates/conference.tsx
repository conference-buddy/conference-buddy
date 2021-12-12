import React, { ReactElement } from "react"
import { graphql } from "gatsby"
import { Conference } from "../domain/conference/conference-interface"

type ConferenceTemplateProps = {
  data: {
    markdownRemark: {
      html: string
      frontmatter: Conference
    }
  }
}

function ConferenceTemplate({ data }: ConferenceTemplateProps): ReactElement {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.startDate}</h2>
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
