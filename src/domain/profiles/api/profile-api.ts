import { User } from "@supabase/supabase-js"
import {
  Profile,
  ProfileCreate,
  ProfileDB,
  ProfileUpdate,
} from "../types/types-profiles"
import { supabase } from "../../_database/supabaseClient"
import { transformProfile } from "../utils/transform-data"
import { createSocialLinks } from "../../_social-links/api/social-links-api"
import { SocialLinksDB } from "src/domain/_social-links/types/types-social-links"

async function usernameExists(username: string): Promise<boolean> {
  const { count } = await supabase
    .from("profiles")
    .select("username", { count: "exact" })
    .eq("username", username)
  return Boolean(count && count > 0)
}

async function getProfile(user: User | null): Promise<Profile | null> {
  if (!user) {
    return null
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    .maybeSingle()

  // in case there's no profile yet for this user,
  // we want to leave here
  if (profileError || !profile) {
    //@TODO proper error handling
    if (profileError) {
      throw profileError
    }
    return null
  }

  const { data: socialLinks, error: socialLinksError } = await supabase
    .from("profiles_social_links")
    .select(
      "github, gitlab, mastodon, twitter, website, linkedin, id, profile_id"
    )
    .eq("profile_id", user.id)
    .single()

  if (socialLinksError) {
    console.error("social link error")
    throw socialLinksError
  }

  const profileFromDB: ProfileDB = profile
  const socialLinksFromDB: SocialLinksDB = socialLinks

  return transformProfile({
    profileFromDB,
    socialLinksFromDB,
  })
}

async function createProfile(newProfile: ProfileCreate) {
  const { error: profileError } = await supabase.from("profiles").insert([
    {
      provider: newProfile.provider,
      email: newProfile.email,
      username: newProfile.username,
      name: newProfile.name,
      id: newProfile.id,
      about_text: newProfile.about_text,
      avatar_url: newProfile.avatar_url,
    },
  ])

  if (profileError) {
    throw profileError
  }

  const { error: socialLinksError } = await createSocialLinks({
    profileId: newProfile.id,
    socialLinks: newProfile.social_links,
  })

  if (socialLinksError) {
    throw profileError
  }

  return true
}

async function updateProfile(profile: ProfileUpdate) {
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      about_text: profile.about_text,
      email: profile.email,
      id: profile.id,
      name: profile.name,
    })
    .eq("id", profile.id)

  const { error: socialLinksError } = await supabase
    .from("profiles_social_links")
    .update({ ...profile.social_links })
    .eq("profile_id", profile.id)
    .select()

  if (socialLinksError || profileError) {
    throw profileError || socialLinksError
  }

  return true
}

export { getProfile, createProfile, updateProfile, usernameExists }
