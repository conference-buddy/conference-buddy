import { getBuddyPosts } from "../../../domain/buddy-posts"
import { useQuery } from "@tanstack/react-query"

export default function useBuddyPosts(conferenceId: string) {
  return useQuery(
    ["buddy_posts", conferenceId],
    () => getBuddyPosts(conferenceId),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
}
