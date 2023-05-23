import React from "react"
import { BuddyAreaPost } from "./BuddyAreaPost"
import { useQuery } from "@tanstack/react-query"
import { getDiscussionPosts } from "../../../domain/discussion/api/discussion-api"
import { DiscussionPost } from "../../../domain/discussion/types/discussion-types"

type BuddyAreaProps = {
  conferenceId: string
}
function BuddyArea({ conferenceId }: BuddyAreaProps) {
  const { data: posts } = useQuery(["discussion_posts"], () =>
    getDiscussionPosts(conferenceId)
  )

  if (!posts) {
    return <div>No posts yet</div>
  }
  return (
    <ul className={"list-group mt-5"}>
      {posts.map((post: DiscussionPost) => {
        return (
          <li key={post.id} className={"list-group-item p-4"}>
            <BuddyAreaPost post={post} />
          </li>
        )
      })}
    </ul>
  )
}

export { BuddyArea }
