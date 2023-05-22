import { getBuddyPosts } from "../../../domain/buddy-posts"
import { useQuery } from "@tanstack/react-query"
import {
  getBuddyCount,
  getBuddyPostsOfUser,
} from "../../../domain/buddy-posts/api/buddy-posts-api"

export function useBuddyPosts(conferenceId: string) {
  return useQuery(
    ["buddy_posts", conferenceId],
    () => getBuddyPosts(conferenceId),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
}

export function useBuddyCount(conferenceId: string) {
  return useQuery(
    ["buddy_count", conferenceId],
    () => getBuddyCount(conferenceId),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
}

export function useBuddyPostsOfUser(profileId: string) {
  return useQuery(
    ["buddy_posts_of_user", profileId],
    () => getBuddyPostsOfUser(profileId),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
}
