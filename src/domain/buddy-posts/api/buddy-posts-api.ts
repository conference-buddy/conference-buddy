import { supabase } from "../../_database/supabaseClient"
import { BuddyPostWithProfile } from "../types/types-buddy-posts"

//eslint-disable-next-line  @typescript-eslint/no-explicit-any
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

export { getBuddyPosts }
