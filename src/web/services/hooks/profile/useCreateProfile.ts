import { useMutation, useQueryClient } from "react-query"
import { supabase } from "../../../../domain/database/supabaseClient"
import { Profile } from "../../../../domain/profile/profile-interface"

async function createProfile(profile: Profile) {
  // Check if username exists
  const { data: userWithUsername } = await supabase
    .from("users")
    .select("*")
    .eq("username", profile.username)
    .single()

  if (userWithUsername) {
    throw new Error("User with username exists")
  }

  const { data: insertData, error: insertError } = await supabase
    .from("profiles")
    .insert([
      {
        provider: profile.provider,
        email: profile.email,
        username: profile.username,
        name: profile.name,
        website: profile.website,
        id: profile.id,
      },
    ])

  if (insertError) {
    throw insertError
  }

  return insertData
}

export default function useCreateProfile(profile: Profile) {
  const queryClient = useQueryClient()
  return useMutation(() => createProfile(profile), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["profile"])
    },
  })
}
