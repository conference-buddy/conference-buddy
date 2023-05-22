import { supabase } from "../../_database/supabaseClient"
import {
  BuddyPostOfUser,
  BuddyPostWithProfile,
} from "../types/types-buddy-posts"

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

const getBuddyCount = async (conferenceId: string): Promise<number | null> => {
  const { error, count } = await supabase
    .from("buddy_posts")
    .select("*", { count: "exact" })
    .eq("conference_id", conferenceId)

  if (error) {
    throw new Error(error.message)
  }

  return count
}

const isBuddy = async (
  conferenceId: string,
  profileId: string | null | undefined
): Promise<boolean> => {
  if (!profileId) return false

  const { data, error } = await supabase
    .from("buddy_posts")
    .select("*", { count: "exact" })
    .match({ conference_id: conferenceId, profile_id: profileId })

  if (error) {
    throw new Error(error.message)
  }

  return data?.length === 1
}

const deleteBuddyPost = async (
  conferenceId: string,
  profileId: string
): Promise<void> => {
  const { data, error } = await supabase
    .from("buddy_posts")
    .delete()
    .eq("conference_id", conferenceId)
    .eq("profile_id", profileId)

  console.log("data", data)
  if (error) {
    throw new Error(error.message)
  }
}

const getBuddyPostsOfUser = async (
  profileId: string
): Promise<BuddyPostOfUser[]> => {
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

  if (error) {
    throw new Error(error.message)
  }

  if (!buddyPosts) {
    throw new Error("Buddy posts for user not found")
  }

  // There is always just one author of a profile. Supabase thinks it could be an array of profiles.
  // See: https://github.com/orgs/supabase/discussions/7610
  return buddyPosts as BuddyPostOfUser[]
}

const createBuddyPost = async ({
  profileId,
  conferenceId,
  text,
}: {
  profileId: string
  conferenceId: string
  text: string
}): Promise<void> => {
  const { error } = await supabase
    .from("buddy_posts")
    .insert({ profile_id: profileId, conference_id: conferenceId, text: text })
    .eq("profile_id", profileId)

  if (error) {
    throw new Error(error.message)
  }
}

export {
  getBuddyPosts,
  getBuddyPostsOfUser,
  createBuddyPost,
  getBuddyCount,
  isBuddy,
  deleteBuddyPost,
}
