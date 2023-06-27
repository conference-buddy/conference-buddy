import React from "react"
import { graphql } from "gatsby"
import { Conference } from "../../../domain/conferences"
import { ConferenceList } from "../../ui-elements/conferences/list/ConferenceList"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import { TextLink } from "../../ui-elements/text-link/TextLink"
import queryString from "query-string"
import { useQuery } from "@tanstack/react-query"
import { getConferencesSearchResult } from "../../../domain/conferences/api/conferences-api"

type ConferenceListPage = {
  data: {
    allConference: { nodes: Conference[] }
  }
  location: Location
}
export default function ConferenceListPage(props: ConferenceListPage) {
  const conferences = props.data.allConference.nodes

  function getSearchTerm(): string {
    const searchParam = queryString.parse(location.search).search
    if (typeof searchParam === "string") {
      return searchParam
    }
    return ""
  }

  const { data: conferencesSearchResults } = useQuery(
    ["conferences-search"],
    () => getConferencesSearchResult(getSearchTerm()),
    {
      enabled: getSearchTerm().length > 0,
    }
  )

  // useEffect(() => {
  //
  // }, [searchParam])

  return (
    <div className="container">
      <div className="mb-3">
        <TextLink internal={true} to={"/"}>
          Home
        </TextLink>
        <span className={"mx-1"}>/</span>
        <span>Conferences</span>
      </div>
      <h1>Conferences</h1>
      <p>
        If you want to be a Conference Buddy at one of these conferences, visit
        the details page. There you can become a buddy.
      </p>
      <p>
        <TextLink internal={true} to={"add"}>
          Add a conference
        </TextLink>
      </p>
      <ConferenceList conferences={conferencesSearchResults || conferences} />
    </div>
  )
}

export function Head() {
  return <PageHead title={"All conferences"} />
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
