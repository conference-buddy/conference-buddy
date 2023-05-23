import { getBuddyPosts } from "../../../domain/buddy-posts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  deleteBuddyPost,
  getBuddyCount,
  getBuddyPostsOfUser,
  isBuddy,
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

export function useIsBuddy(
  conferenceId: string,
  profileId: string | undefined | null
) {
  return useQuery(
    ["is_buddy", conferenceId, profileId],
    () => isBuddy(conferenceId, profileId),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )
}

export function useDeleteBuddyPost() {
  const queryClient = useQueryClient()

  return useMutation(
    ["delete_buddy_post"],
    ({
      conferenceId,
      profileId,
    }: {
      conferenceId: string
      profileId: string
    }) => deleteBuddyPost(conferenceId, profileId),
    {
      retry: false,
      onSuccess: async () => {
        await queryClient.invalidateQueries(["is_buddy"])
        await queryClient.invalidateQueries(["buddy_count"])
        await queryClient.invalidateQueries(["buddy_posts"])
      },
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
