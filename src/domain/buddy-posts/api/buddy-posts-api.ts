import { supabase } from "../../_database/supabaseClient"
import { BuddyPostDB, BuddyPostWithProfile } from "../types/types-buddy-posts"

const getBuddyPosts = async (
  conferenceId: string
): Promise<BuddyPostWithProfile[]> => {
  const { data: buddyPosts, error } = await supabase
    .from("buddy_posts")
    .select(
      `
        *,
        profile:profiles(
          username,
          avatar_url
        )
      `
    )
    .eq("conference_id", conferenceId)
    .limit(1, { foreignTable: "profiles" })

  if (error) {
    throw new Error(error.message)
  }

  if (!buddyPosts) {
    throw new Error("Buddy posts not found")
  }

  // There is always just one author of a profile. Supabase thinks it could be an array of profiles.
  // See: https://github.com/orgs/supabase/discussions/7610
  return buddyPosts as BuddyPostWithProfile[]
}

const getBuddyPostsOfUser = async (
  profileId: string
): Promise<BuddyPostDB[]> => {
  const { data: buddyPosts, error } = await supabase
    .from("buddy_posts")
    .select(
      `
        *,
        conference:conferences(
            name
        )
      `
    )
    .eq("profile_id", profileId)

  console.log("buddyPosts", buddyPosts)

  if (error) {
    throw new Error(error.message)
  }

  if (!buddyPosts) {
    throw new Error("Buddy posts for user not found")
  }

  return buddyPosts
}

export { getBuddyPosts, getBuddyPostsOfUser }
