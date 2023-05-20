import React, { ReactElement } from "react"
import useBuddyPosts from "../../../services/hooks/buddy-post/useBuddyPosts"
import { BuddyPostSingle } from "./BuddyPost"

function BuddyPostList({
  conferenceId,
}: {
  conferenceId: string
}): ReactElement {
  const { data: buddyPosts, isLoading } = useBuddyPosts(conferenceId)

  return (
    <>
      {!isLoading &&
        //eslint-disable-next-line
                buddyPosts.map((post: any, index: number) => {
          return <BuddyPostSingle key={index} post={post} />
        })}
    </>
  )
}

export { BuddyPostList }
