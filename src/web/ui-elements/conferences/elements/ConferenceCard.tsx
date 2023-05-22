import React from "react"
import { ConferenceLocation } from "./ConferenceLocation"
import { Conference } from "../../../../domain/conferences"
import { ConferenceDates } from "./ConferenceDates"
import { Link } from "gatsby"
import { useBuddyCount } from "../../../../services/hooks/buddy-post/useBuddyPosts"

type ConferenceCardProps = {
  conference: Conference
}
function ConferenceCard({ conference }: ConferenceCardProps) {
  const { data: count } = useBuddyCount(conference.id)
  console.log("count in ConferenceCard", count)

  return (
    <div className="card mb-3">
      <div className="card-header small d-flex flex-column flex-md-row justify-content-md-between border-0">
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
          <h5 className="card-title flex-grow-1">{conference.name}</h5>
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
      <div className="card-footer border-0">
        <span aria-hidden={"true"}> 🐶 </span>
        <span className="fw-bold text-primary">{count}</span> Conference Buddies
      </div>
    </div>
  )
}

export { ConferenceCard }
