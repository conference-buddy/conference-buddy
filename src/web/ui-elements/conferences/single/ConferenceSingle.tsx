import React from "react"
import { Conference } from "../../../../domain/conferences"
import { ConferenceLocation } from "../elements/ConferenceLocation"
import { ConferenceDates } from "../elements/ConferenceDates"
import { TextLink } from "../../text-link/TextLink"
import { useBuddyCount } from "../../../../services/hooks/buddy-post/useBuddyPosts"
import { StaticImage } from "gatsby-plugin-image"
import { IconWorld } from "@tabler/icons-react"

type ConferenceSingleProps = {
  conference: Conference
}

function ConferenceSingle({ conference }: ConferenceSingleProps) {
  const { data: count } = useBuddyCount(conference.id)

  return (
    <>
      <article className="card mb-4">
        <div className="card-header small d-flex flex-column flex-md-row justify-content-md-between  border-0">
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
          <h1 className="mt-2 mb-3">{conference.name}</h1>
          {conference.url && (
            <p className="mb-1">
              <IconWorld aria-hidden="true" />
              <TextLink to={conference.url} internal={false}>
                {conference.url}
              </TextLink>
            </p>
          )}
          <p className="mt-5">{conference.description}</p>
        </div>
        <div className="card-footer lead text-pr text-center border-0">
          <StaticImage
            aria-hidden={true}
            src="../../../assets/images/icon.png"
            alt={"Conference buddy logo"}
            width={35}
            className="me-2"
          />
          <span className="fw-bold text-primary">{count}</span> Conference
          Buddies
        </div>
      </article>
    </>
  )
}

export { ConferenceSingle }
