import { useQuery, UseQueryResult } from "react-query"
import { supabase } from "../../database/supabaseClient"

const getBuddyPosts = async (conferenceId: string): Promise<any> => {
  console.log("getBuddyPosts")
  console.log(conferenceId)
  const { data: conference, error } = await supabase
    .from("buddy-posts")
    .select("*")
    .eq("conference_id", conferenceId)

  if (error) {
    throw new Error(error.message)
  }

  if (!conference) {
    throw new Error("Buddy posts not found")
  }

  return conference
}

export default function useBuddyPosts(
  conferenceId: string
  //eslint-disable-next-line
): UseQueryResult<any | unknown> {
  return useQuery(
    ["buddy-posts", conferenceId],
    () => getBuddyPosts(conferenceId),
    {
      retry: false,
      // refetchOnWindowFocus: false,
    }
  )
}
