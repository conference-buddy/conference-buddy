import { User } from "@supabase/supabase-js"
import {
  Profile,
  ProfileDB,
  SocialLink,
  SocialLinksDB,
} from "../types/types-profiles"
import { supabase } from "../../_database/supabaseClient"
import { transformProfile } from "../utils/transform-data"
import { createSocialLinks } from "../../_social-links/social-links-api"

const getProfile = async (user: User | undefined): Promise<Profile | null> => {
  if (!user) {
    return null
  }

  const profile = supabase
    .from<ProfileDB>("profiles")
    .select()
    .eq("id", user.id)
    .single()

  const socialLinks = supabase
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
      throw Error(profilesError?.message || socialLinksError?.message)
    }

    if (profileData && socialLinksData) {
      const profileFromDB: ProfileDB = profileData
      const socialLinksFromDB: SocialLinksDB = socialLinksData

      return transformProfile({
        profileFromDB,
        socialLinksFromDB,
      })
    } else {
      console.error("No profile or social links created in DB")
      return null
    }
  })
}

async function createProfile(newProfile: Profile) {
  const { data: userWithUsername } = await supabase
    .from<ProfileDB>("users")
    .select("*")
    .eq("username", newProfile.username)
    .single()

  if (userWithUsername) {
    throw new Error("User with username exists")
  }

  const profile = supabase.from<ProfileDB>("profiles").insert([
    {
      provider: newProfile.provider,
      email: newProfile.email,
      username: newProfile.username,
      name: newProfile.name,
      id: newProfile.id,
    },
  ])

  const socialLinks = createSocialLinks({
    profileId: newProfile.id,
    socialLinks: newProfile.social_links,
  })

  return Promise.all([profile, socialLinks]).then(([profile, socialLinks]) => {
    const { data: profileData, error: profilesError } = profile
    const { data: socialLinksData, error: socialLinksError } = socialLinks

    debugger
    if (profilesError || socialLinksError) {
      throw Error(profilesError?.message || socialLinksError?.message)
    }

    if (!profileData || !socialLinksData) {
      throw Error("No profile or social links created in DB")
    }

    const profileFromDB: ProfileDB = profileData[0]
    const socialLinksFromDB: SocialLinksDB = socialLinksData
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
    })
    .match({ id: profile.id })

  if (insertError) {
    throw insertError
  }
  return insertData
}

export { getProfile, createProfile, updateProfile }
