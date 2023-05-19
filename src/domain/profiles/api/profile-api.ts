import { User } from "@supabase/supabase-js"
import { Profile, ProfileDB } from "../types/types-profiles"
import { supabase } from "../../_database/supabaseClient"
import { transformProfile } from "../utils/transform-data"
import { createSocialLinks } from "../../_social-links/api/social-links-api"
import { SocialLinksDB } from "src/domain/_social-links/types/types-social-links"

async function usernameExists(username: string): Promise<boolean> {
  const matchingUserNames = await supabase
    .from("profiles")
    .select()
    .eq("username", username)

  return !!(
    matchingUserNames &&
    matchingUserNames.data &&
    matchingUserNames.data.length > 0
  )
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
    .select()
    .eq("id", user.id)
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

async function createProfile(
  newProfile: Omit<Profile, "created_at" | "avatar_url" | "updated_at">
) {
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .insert([
      {
        provider: newProfile.provider,
        email: newProfile.email,
        username: newProfile.username,
        name: newProfile.name,
        id: newProfile.id,
        about_text: newProfile.about_text,
      },
    ])

  if (profileError) {
    throw profileError
  }

  console.log("profile", profile)

  const { data: socialLinks, error: socialLinksError } =
    await createSocialLinks({
      profileId: newProfile.id,
      socialLinks: newProfile.social_links,
    })

  if (socialLinksError) {
    throw profileError
  }

  console.log("socialLinks", socialLinks)

  return true
  // return Promise.all([profile, socialLinks])
  //   .then(([profile, socialLinks]) => {
  //     const { data: profileData, error: profilesError } = profile
  //     const { data: socialLinksData, error: socialLinksError } = socialLinks
  //
  //     if (profilesError) {
  //       throw profilesError
  //     }
  //
  //     if (socialLinksError) {
  //       throw profilesError
  //     }
  //
  //     if (!profileData) {
  //       debugger
  //       throw Error("ne")
  //     }
  //
  //     if (!socialLinksData) {
  //       debugger
  //       throw Error("ne")
  //     }
  //
  //     const profileFromDB: ProfileDB = profileData[0]
  //     const socialLinksFromDB: SocialLinksDB = socialLinksData[0]
  //     return transformProfile({
  //       profileFromDB,
  //       socialLinksFromDB,
  //     })
  //   })
  //   .catch(error => {
  //     console.log(error)
  //     debugger
  //   })
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

export { getProfile, createProfile, updateProfile, usernameExists }
