import { getBuddyPosts } from "../../../domain/buddy-posts"
import { useQuery, UseQueryResult } from "@tanstack/react-query"

export default function useBuddyPosts(
  conferenceId: string
  //eslint-disable-next-line
): UseQueryResult<any | unknown> {
  return useQuery(
    ["buddy_posts", conferenceId],
    () => getBuddyPosts(conferenceId),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
}
