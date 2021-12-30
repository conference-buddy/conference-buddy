import React, { ReactElement } from "react"
import useConference from "../../hooks/useConference"
import { Conference } from "../../domain/conference/conference-interface"

function ConferenceTemplate({ id }: { id: string }): ReactElement {
  const { data: conference, isLoading } = useConference(id) as {
    data: Conference
    isLoading: boolean
  }
  return (
    <div>
      <h1>Conference Page</h1>
      <h2>{id}</h2>
      <h2>{isLoading}</h2>
      <h2>{JSON.stringify(conference)}</h2>
    </div>
  )
}

export default ConferenceTemplate
