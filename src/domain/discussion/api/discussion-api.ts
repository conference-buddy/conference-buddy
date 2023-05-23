import { supabase } from "../../_database/supabaseClient"
import { DiscussionPost } from "../types/discussion-types"

async function getDiscussionPosts(
  conferenceId: string
): Promise<DiscussionPost> {
  const { data: discussion, error: errorDiscussion } = await supabase
    .from("discussions")
    .select("id")
    .eq("conference_id", conferenceId)
    .single()

  if (errorDiscussion) {
    throw errorDiscussion
  }

  if (!discussion.id) {
    throw Error("There is no buddy area at the moment. Please try again later!")
  }

  const { data: discussionPosts, error: discussionPostsError } = await supabase
    .from("discussion_posts")
    .select("*")
    .eq("discussion_id", discussion.id)

  if (discussionPostsError) {
    throw discussionPostsError
  }

  return discussionPosts
}

export { getDiscussionPosts }
