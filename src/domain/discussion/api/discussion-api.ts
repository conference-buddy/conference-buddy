import { supabase } from "../../_database/supabaseClient"
import { DiscussionPost, DiscussionPostCreate } from "../types/discussion-types"

async function getDiscussionId(conferenceId: string): Promise<string> {
  const { data, error } = await supabase
    .from("discussions")
    .select("id")
    .eq("conference_id", conferenceId)
    .single()
  if (error) {
    throw error
  }

  if (!data || !data.id) {
    throw Error("No discussion found.")
  }
  const id: string = data.id
  return id
}
async function getDiscussionPosts(
  discussionId: string
): Promise<DiscussionPost[]> {
  console.log("getDiscussionPosts", discussionId)
  const { data: discussionPosts, error: discussionPostsError } = await supabase
    .from("discussion_posts")
    .select()
    .eq("discussion_id", discussionId)
    .order("created_at", { ascending: false })

  console.log("data", discussionPosts)
  console.log("discussionPostsError", discussionPostsError)
  if (discussionPostsError) {
    throw discussionPostsError
  }

  return discussionPosts
}

async function createDiscussionPost(discussionPost: DiscussionPostCreate) {
  const data = await supabase.from("discussion_posts").insert([discussionPost])
  return data
}

export { getDiscussionPosts, createDiscussionPost, getDiscussionId }
