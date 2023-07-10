import React, { useState } from "react"
import { graphql } from "gatsby"
import { Conference } from "../../../domain/conferences"
import { ConferenceList } from "../../ui-elements/conferences/list/ConferenceList"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import { TextLink } from "../../ui-elements/text-link/TextLink"
import queryString from "query-string"
import { useQuery } from "@tanstack/react-query"
import { getConferencesSearchResult } from "../../../domain/conferences/api/conferences-api"
import { Search } from "../../ui-elements/search/Search"

type ConferenceListPage = {
  data: {
    allConference: { nodes: Conference[] }
  }
  location: Location
}
export default function ConferenceListPage(props: ConferenceListPage) {
  const initialSearch: string =
    (queryString.parse(props.location.search).search as string) || ""

  const conferences = props.data.allConference.nodes
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch)

  const { data: conferencesSearchResults } = useQuery(
    ["conferences-search", searchTerm],
    () => getConferencesSearchResult(searchTerm),
    {
      enabled: searchTerm.length > 0,
    }
  )

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
        the details page. There you can become a buddy. You can't find the
        conference you're looking for here? Please reach out to{" "}
        <TextLink internal={true} to={"add"}>
          add the conference.
        </TextLink>
      </p>
      <div className={"row my-4"}>
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchLabel={"Search for conferences"}
          searchDescription={"Search by name, city, country and description."}
          className={"offset-md-6 col-md-6 align-self-end"}
        />
      </div>
      {conferencesSearchResults ? (
        <div className={"ps-2 pb-3 d-flex justify-content-between"}>
          <div>
            {conferencesSearchResults.length} conferences found for your search.{" "}
          </div>
          <div>
            <button
              className={"btn btn-sm btn-link"}
              onClick={() => {
                setSearchTerm("")
              }}
            >
              Show all conferences
            </button>
          </div>
        </div>
      ) : (
        <div className={"ps-2 pb-3"}>
          {conferences.length} conferences total
        </div>
      )}

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
