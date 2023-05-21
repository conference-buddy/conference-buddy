import React, { ReactElement } from "react"
import useBuddyPosts from "../../../services/hooks/buddy-post/useBuddyPosts"
import { BuddyPost } from "./BuddyPost"

function BuddyPosts({ conferenceId }: { conferenceId: string }): ReactElement {
  const { data: buddyPosts, isLoading } = useBuddyPosts(conferenceId)

  return (
    <>
      {!isLoading && buddyPosts ? (
        buddyPosts.map((post, index: number) => {
          return <BuddyPost key={index} post={post} />
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
