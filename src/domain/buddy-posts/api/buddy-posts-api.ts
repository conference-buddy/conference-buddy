import { supabase } from "../../_database/supabaseClient"

//eslint-disable-next-line  @typescript-eslint/no-explicit-any
const getBuddyPosts = async (conferenceId: string): Promise<any> => {
  const { data: buddyPosts, error } = await supabase
    .from("buddy_posts")
    .select("*")
    .eq("conference_id", conferenceId)

  if (error) {
    throw new Error(error.message)
  }

  if (!buddyPosts) {
    throw new Error("Buddy posts not found")
  }

  return buddyPosts
}

export { getBuddyPosts }
