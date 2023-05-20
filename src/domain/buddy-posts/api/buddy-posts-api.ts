import { supabase } from "../../_database/supabaseClient"
import { BuddyPostDB } from "../types/types-buddy-posts"

//eslint-disable-next-line  @typescript-eslint/no-explicit-any
const getBuddyPosts = async (conferenceId: string): Promise<BuddyPostDB> => {
  const { data: buddyPosts, error } = await supabase
    .from("buddy_posts")
    .select("*")
    .eq("conference_id", conferenceId)

  if (error) {
    throw new Error(error.message)
  }

  console.log("eee", { buddyPosts, conferenceId })

  if (!buddyPosts) {
    throw new Error("Buddy posts not found")
  }

  return buddyPosts
}

export { getBuddyPosts }
