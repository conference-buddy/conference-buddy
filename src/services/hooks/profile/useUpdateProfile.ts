import { useMutation } from "react-query"
import { supabase } from "../../database/supabaseClient"
import { ProfilePrivate } from "../../../domain/profile/profile-interface"

export default function useUpdateProfile(profile: ProfilePrivate) {
  return useMutation(async () => {
    const { data: insertData, error: insertError } = await supabase
      .from("profiles")
      .update({
        username: profile.username,
        name: profile.name,
        website: profile.website,
      })
      .match({ id: profile.id })

    if (insertError) {
      throw insertError
    }
    return insertData
  })
}
