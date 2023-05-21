import React from "react"
import { ConferenceLocation } from "./ConferenceLocation"
import { Conference } from "../../../../domain/conferences"
import { ConferenceDates } from "./ConferenceDates"
import { Link } from "gatsby"

type ConferenceCardProps = {
  conference: Conference
}
function ConferenceCard({ conference }: ConferenceCardProps) {
  return (
    <div className="card mb-3">
      <div className="card-header small d-flex flex-column flex-md-row justify-content-md-between">
        <ConferenceLocation
          city={conference.city}
          country={conference.country}
        />
        <ConferenceDates
          startDate={conference.start_date}
          endDate={conference.start_date}
        />
      </div>
      <div className="card-body">
        <div className="d-flex">
          <div className="flex-grow-1">
            <h5 className="card-title ">{conference.name}</h5>
            <p>🐶&nbsp;&nbsp;2 buddies for this event</p>
          </div>
          <p className="d-flex flex-column">
            <Link
              to={`/conference/${conference.id}`}
              className="btn btn-primary"
            >
              Details
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export { ConferenceCard }
