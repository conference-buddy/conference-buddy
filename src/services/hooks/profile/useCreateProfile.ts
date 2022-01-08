import { useMutation, useQueryClient } from "react-query"
import { supabase } from "../../database/supabaseClient"
import { ProfilePrivate } from "../../../domain/profile/profile-interface"

const createProfile = async (profile: ProfilePrivate) => {
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

// eslint-disable-next-line
export default function useCreateProfile(profile: ProfilePrivate) {
  const queryClient = useQueryClient()
  return useMutation(() => createProfile(profile), {
    onSuccess: async () => {
      // ✅ refetch the comments list for our blog post

      await queryClient.invalidateQueries(["profile"])
    },
  })
}
