import React, { useState } from "react"
import { Conference } from "../../../../domain/conferences"
import { ConferenceLocation } from "../elements/ConferenceLocation"
import { ConferenceDates } from "../elements/ConferenceDates"
import { TextLink } from "../../text-link/TextLink"
import { BuddyPostForm } from "../../buddy-posts/BuddyPostForm"
import { SignIn } from "../../sign-in/SignIn"
import useProfile from "../../../../services/hooks/profile/useProfile"

type ConferenceSingleProps = {
  conference: Conference
}

function ConferenceSingle({ conference }: ConferenceSingleProps) {
  const [showConferenceBuddyForm, setShowConferenceBuddyForm] = useState(false)
  const { data: profile } = useProfile()

  return (
    <>
      <article className="card mb-4">
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
          <h1 className="mt-2 mb-3">{conference.name}</h1>
          {conference.url && (
            <p className="mb-1">
              <span aria-hidden="true" className="me-2">
                🌐
              </span>
              <TextLink to={conference.url} internal={false}>
                {conference.url}
              </TextLink>
            </p>
          )}
          <p className="mt-5">{conference.description}</p>
          <div className="d-flex align-items-center flex-column mt-5">
            <p className="lead">
              <span aria-hidden={"true"}> 🐶 </span>2 Conference Buddies for
              this event
            </p>
            {profile ? (
              <button
                disabled={showConferenceBuddyForm}
                onClick={() =>
                  setShowConferenceBuddyForm(!showConferenceBuddyForm)
                }
                className="col col-md-4 btn btn-primary mt-2 mb-2"
              >
                Become a Conference Buddy
              </button>
            ) : (
              <>
                <p>Sign in to be able to become a ConferenceBuddy as well</p>
                <SignIn standAlone={true} />
              </>
            )}
          </div>
        </div>
      </article>
      {showConferenceBuddyForm && profile && (
        <BuddyPostForm
          conferenceId={conference.id}
          profileId={profile.id}
          cancelEvent={() =>
            setShowConferenceBuddyForm(!showConferenceBuddyForm)
          }
        ></BuddyPostForm>
      )}
    </>
  )
}

export { ConferenceSingle }
