import React, { ReactElement } from "react"
import { Conference } from "../../../../domain/conferences"
import { ConferenceCard } from "../elements/ConferenceCard"

type ConferenceListProps = {
  conferences: Conference[]
}

function ConferenceList({ conferences }: ConferenceListProps): ReactElement {
  if (conferences.length === 0) {
    return (
      <p className="text-info fs-5 bg-light p-4">
        <span aria-hidden={"true"}> ℹ️</span> Sorry, we can not find any
        conferences right now.
      </p>
    )
  }
  return (
    <>
      {conferences.map(conf => {
        return <ConferenceCard key={conf.id} conference={conf} />
      })}
    </>
  )
}

export { ConferenceList }
