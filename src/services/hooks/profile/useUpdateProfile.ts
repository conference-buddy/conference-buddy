import { useMutation, useQueryClient } from "react-query"
import { supabase } from "../../database/supabaseClient"
import { Profile } from "../../../domain/profile/profile-interface"

async function updateProfile(profile: Profile) {
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
}

export default function useUpdateProfile(profile: Profile) {
  const queryClient = useQueryClient()
  return useMutation(() => updateProfile(profile), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["profile"])
    },
  })
}
