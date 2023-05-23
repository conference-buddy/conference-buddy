import React, { ReactElement } from "react"
import { useBuddyPostsOfUser } from "../../../services/hooks/buddy-post/useBuddyPosts"
import { BuddyPostOfUser } from "./BuddyPostOfUser"
import { TextLink } from "../text-link/TextLink"

function BuddyPostsOfUser({ profileId }: { profileId: string }): ReactElement {
  const { data: buddyPosts, isLoading } = useBuddyPostsOfUser(profileId)

  return (
    <>
      {isLoading ? (
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {buddyPosts && buddyPosts?.length > 0 ? (
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
            <>
              <p>
                No BuddyPost created yet. Visit the{" "}
                <TextLink to={"/conferences"} internal={true}>
                  conferences page
                </TextLink>{" "}
                to find a conference where you want to join as a buddy
              </p>
            </>
          )}
        </>
      )}
    </>
  )
}

export { BuddyPostsOfUser }
