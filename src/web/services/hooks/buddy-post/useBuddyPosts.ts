import { useQuery, UseQueryResult } from "react-query"
import { getBuddyPosts } from "../../../../domain/buddy-posts/api/buddy-posts-api"

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
