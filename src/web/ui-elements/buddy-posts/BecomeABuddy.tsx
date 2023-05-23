import React, { useEffect, useState } from "react"
import { SignIn } from "../sign-in/SignIn"
import {
  useDeleteBuddyPost,
  useIsBuddy,
} from "../../../services/hooks/buddy-post/useBuddyPosts"
import { BuddyPostForm } from "./BuddyPostForm"
import useProfile from "../../../services/hooks/profile/useProfile"
import { TextLink } from "../text-link/TextLink"

function BecomeABuddy({ conferenceId }: { conferenceId: string }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showConferenceBuddyForm, setShowConferenceBuddyForm] = useState(false)
  const { mutate, isLoading: isLoadingDeletePost } = useDeleteBuddyPost()
  const { data: profile, isLoading: isLoadingProfile } = useProfile()
  const { data: isBuddy, isLoading: isLoadingBuddy } = useIsBuddy(
    conferenceId,
    profile?.id
  )

  useEffect(() => {
    setIsLoading(isLoadingProfile && isLoadingBuddy)
  }, [isLoadingProfile, isLoadingBuddy])

  return (
    <>
      <div className="card mb-4">
        <div className="card-body">
          {isLoading ? (
            <div className="container text-center ">
              <p className="text-primary lead">Loading buddy status</p>
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <>
              {isBuddy && profile && (
                <>
                  <h3>🎉 You are a Conference Buddy for this event</h3>
                  <div className="alert alert-info" role="alert">
                    ℹ️ If you don't want to be a Conference Buddy anymore, you
                    can delete you post: &nbsp;&nbsp;
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        mutate({ conferenceId, profileId: profile.id })
                      }
                    >
                      {isLoadingDeletePost ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Loading...</span>
                        </>
                      ) : (
                        "Delete my post"
                      )}
                    </button>
                  </div>
                  <div className="lead d-flex w-100 justify-content-center">
                    <TextLink
                      to={`/conference/${conferenceId}/buddy-area`}
                      internal={true}
                    >
                      Go to Buddy area &rarr;
                    </TextLink>
                  </div>
                </>
              )}

              {!isBuddy && (
                <>
                  <h3>Become a Conference Buddy</h3>
                  <div className="alert alert-primary" role="alert">
                    ℹ️ To build trust and establish a comfortable space, we
                    require users to make a post before they can see other
                    content on the platform.
                  </div>
                </>
              )}

              {!showConferenceBuddyForm && !isBuddy && profile && (
                <div className="d-flex justify-content-center">
                  <button
                    onClick={() =>
                      setShowConferenceBuddyForm(!showConferenceBuddyForm)
                    }
                    className="col col-md-4 btn btn-primary mt-2 mb-2"
                  >
                    Become a Conference Buddy
                  </button>
                </div>
              )}

              {!isBuddy && !profile && (
                <div className="d-flex flex-column align-items-center">
                  <p>Sign in to be able to become a ConferenceBuddy as well</p>
                  <SignIn standAlone={true} />
                </div>
              )}

              {showConferenceBuddyForm && profile && !isBuddy && (
                <BuddyPostForm
                  conferenceId={conferenceId}
                  profileId={profile.id}
                  successEvent={() =>
                    setShowConferenceBuddyForm(!showConferenceBuddyForm)
                  }
                  cancelEvent={() =>
                    setShowConferenceBuddyForm(!showConferenceBuddyForm)
                  }
                ></BuddyPostForm>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export { BecomeABuddy }
