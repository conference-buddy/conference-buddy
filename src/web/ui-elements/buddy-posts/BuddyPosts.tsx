import React, { ReactElement } from "react"
import useBuddyPosts from "../../../services/hooks/buddy-post/useBuddyPosts"
import { BuddyPost } from "./BuddyPost"
import { BuddyPostDB } from "../../../domain/buddy-posts"

function BuddyPosts({ conferenceId }: { conferenceId: string }): ReactElement {
  const { data: buddyPosts, isLoading } = useBuddyPosts(conferenceId)

  return (
    <>
      {!isLoading &&
        buddyPosts.map((post: BuddyPostDB, index: number) => {
          return <BuddyPost key={index} post={post} />
        })}
    </>
  )
}

export { BuddyPosts }
