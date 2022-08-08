import { User } from "@supabase/supabase-js"
import { Profile, ProfileDB } from "../types/types-profiles"
import { supabase } from "../../_database/supabaseClient"
import { transformProfile } from "../utils/transform-data"
import { createSocialLinks } from "../../_social-links/api/social-links-api"
import { SocialLinksDB } from "src/domain/_social-links/types/types-social-links"

async function usernameExists(username: string): Promise<boolean> {
  const matchingUserNames = await supabase
    .from<ProfileDB>("profiles")
    .select()
    .eq("username", username)

  return !!(
    matchingUserNames &&
    matchingUserNames.data &&
    matchingUserNames.data.length > 0
  )
}

async function getProfile(user: User | undefined): Promise<Profile | null> {
  if (!user) {
    return null
  }

  const profile = supabase
    .from<ProfileDB>("profiles")
    .select()
    .eq("id", user.id)
    .single()

  const socialLinks = await supabase
    .from<SocialLinksDB>("profiles_social_links")
    .select()
    .eq("id", user.id)
    .single()

  return Promise.all([profile, socialLinks]).then(([profile, socialLinks]) => {
    const { data: profileData, error: profilesError } = profile
    const { data: socialLinksData, error: socialLinksError } = socialLinks

    if (!profileData) {
      return null
    }

    if (profilesError || socialLinksError) {
      console.error(
        "something went wrong while getting a profile with social links",
        profilesError?.message || socialLinksError?.message
      )
    }

    if (profileData && socialLinksData) {
      const profileFromDB: ProfileDB = profileData
      const socialLinksFromDB: SocialLinksDB = socialLinksData

      return transformProfile({
        profileFromDB,
        socialLinksFromDB,
      })
    } else {
      console.error("No profile or social links found.")
      return null
    }
  })
}

async function createProfile(newProfile: Omit<Profile, "created_at">) {
  const profile = supabase.from<ProfileDB>("profiles").insert([
    {
      provider: newProfile.provider,
      email: newProfile.email,
      username: newProfile.username,
      name: newProfile.name,
      id: newProfile.id,
      about_text: newProfile.about_text,
    },
  ])

  const socialLinks = createSocialLinks({
    profileId: newProfile.id,
    socialLinks: newProfile.social_links,
  })

  return Promise.all([profile, socialLinks]).then(([profile, socialLinks]) => {
    const { data: profileData, error: profilesError } = profile
    const { data: socialLinksData, error: socialLinksError } = socialLinks

    if (profilesError || socialLinksError) {
      throw Error(profilesError?.message || socialLinksError?.message)
    }

    if (!profileData || !socialLinksData) {
      throw Error("No profile or social links created in DB")
    }

    const profileFromDB: ProfileDB = profileData[0]
    const socialLinksFromDB: SocialLinksDB = socialLinksData[0]
    return transformProfile({
      profileFromDB,
      socialLinksFromDB,
    })
  })
}

async function updateProfile(profile: Profile) {
  const { data: insertData, error: insertError } = await supabase
    .from("profiles")
    .update({
      username: profile.username,
      name: profile.name,
      avatar_url: profile.avatar_url,
    })
    .match({ id: profile.id })

  if (insertError) {
    throw insertError
  }
  return insertData
}

export { getProfile, createProfile, updateProfile, usernameExists }
