import React, { ReactElement } from "react"
import { BuddyPost } from "./BuddyPost"
import { useBuddyPosts } from "../../../services/hooks/buddy-post/useBuddyPosts"
import useProfile from "../../../services/hooks/profile/useProfile"

function BuddyPosts({ conferenceId }: { conferenceId: string }): ReactElement {
  const { data: profile, isLoading: profileIsLoading } = useProfile()
  const { data: buddyPosts, isLoading } = useBuddyPosts(conferenceId)

  if (!profileIsLoading && !profile) {
    return <></>
  }

  return (
    <>
      {!isLoading && buddyPosts ? (
        buddyPosts.map((post, index: number) => {
          return (
            <BuddyPost
              key={index}
              text={post.text}
              createdAt={post.created_at}
              username={post.profile?.username}
              avatarUrl={post.profile?.avatar_url}
            />
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

export { BuddyPosts }
