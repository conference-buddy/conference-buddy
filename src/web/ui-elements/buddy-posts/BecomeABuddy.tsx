import React, { useState } from "react"
import { SignIn } from "../sign-in/SignIn"
import { useBuddyCount } from "../../../services/hooks/buddy-post/useBuddyPosts"
import { BuddyPostForm } from "./BuddyPostForm"
import useProfile from "../../../services/hooks/profile/useProfile"

function BecomeABuddy({ conferenceId }: { conferenceId: string }) {
  const [showConferenceBuddyForm, setShowConferenceBuddyForm] = useState(false)
  const { data: profile } = useProfile()
  const { data: count } = useBuddyCount(conferenceId)

  return (
    <>
      <div className="card mb-4">
        <div className="card-body">
          <h3>
            <span aria-hidden={"true"}> 🐶 </span>
            {count} Conference Buddies for this event
          </h3>
          <div className="d-flex align-items-center flex-column">
            <div className="alert alert-primary" role="alert">
              ℹ️ Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since of the printing and.
            </div>
            {!showConferenceBuddyForm && (
              <>
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
                    <p>
                      Sign in to be able to become a ConferenceBuddy as well
                    </p>
                    <SignIn standAlone={true} />
                  </>
                )}
              </>
            )}
          </div>

          {showConferenceBuddyForm && profile && (
            <BuddyPostForm
              conferenceId={conferenceId}
              profileId={profile.id}
              cancelEvent={() =>
                setShowConferenceBuddyForm(!showConferenceBuddyForm)
              }
            ></BuddyPostForm>
          )}
        </div>
      </div>
    </>
  )
}

export { BecomeABuddy }
