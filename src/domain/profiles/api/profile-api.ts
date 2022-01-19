import { User } from "@supabase/supabase-js"
import { Profile } from "../profiles-interface"
import { supabase } from "../../database/supabaseClient"

const getProfile = async (user: User | undefined): Promise<Profile | null> => {
  if (!user) {
    return null
  }

  const { data: dataSupabase, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    .single()

  if (!dataSupabase) {
    return null
  }

  if (error) {
    throw new Error(error.message)
  }

  return dataSupabase
}

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
        id: profile.id,
      },
    ])

  if (insertError) {
    throw insertError
  }

  return insertData
}

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

export { getProfile, createProfile, updateProfile }
