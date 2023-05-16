import React from "react"
import { graphql } from "gatsby"
import { Conference } from "../../../domain/conferences"

type ConferenceListPage = {
  data: { allConference: { nodes: Conference[] } }
}
export default function ConferenceListPage(props: ConferenceListPage) {
  return (
    <>
      <h1>Conference List</h1>
      <p>
        If you want to be a Conference Buddy at one of these conferences, click
        the button 🐶 and leave a comment! You are not sure you want to be one,
        but you want to keep updated? Be a Lurker 👀 and get notifications.
      </p>
      {props.data.allConference.nodes.map(conf => (
        <li key={conf.id}>{conf.name}</li>
      ))}
    </>
  )
}

export const query = graphql`
  {
    allConference {
      nodes {
        name
        country
        city
        description
        end_date
        id
        start_date
        url
      }
    }
  }
`
