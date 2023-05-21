import React, { ReactElement } from "react"
import { useBuddyPostsOfUser } from "../../../services/hooks/buddy-post/useBuddyPosts"
import { BuddyPostOfUser } from "./BuddyPostOfUser"

function BuddyPostsOfUser({ profileId }: { profileId: string }): ReactElement {
  const { data: buddyPosts, isLoading } = useBuddyPostsOfUser(profileId)

  return (
    <>
      {!isLoading && buddyPosts ? (
        buddyPosts.map((post, index: number) => {
          return (
            <div key={index}>
              <BuddyPostOfUser
                text={post.text}
                createdAt={post.created_at}
                conferenceId={post.conference_id}
                conferenceName={post.conference?.name}
              />
              {buddyPosts.length > 1 && index < buddyPosts.length - 1 && (
                <hr className="text-confbuddy-pink" />
              )}
            </div>
          )
        })
      ) : (
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  )
}

export { BuddyPostsOfUser }
