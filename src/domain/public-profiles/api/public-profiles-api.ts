import { supabase } from "../../_database/supabaseClient"
import { PublicProfile } from "../types/types-public-profile"
import { ProfileDB } from "../../profiles/types/types-profiles"
import {
  transformPublicProfiles,
  transformPublicProfile,
} from "../utils/transform-data"
import { getAllSocialLinks } from "../../_social-links/social-links-api"

const getPublicProfile = async (
  profileId: string | undefined
): Promise<PublicProfile | null> => {
  if (!profileId) return null
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("name,username")
    .eq("id", profileId)
    .single()

  if (!profile) {
    return null
  }

  if (error) {
    throw new Error(error.message)
  }

  return transformPublicProfile(profile)
}

const getPublicProfiles = async (): Promise<PublicProfile[] | undefined> => {
  const profiles = supabase
    .from<ProfileDB>("profiles")
    .select("id,name,username")
  const socialLinks = getAllSocialLinks()

  return Promise.all([profiles, socialLinks]).then(
    ([profiles, socialLinks]) => {
      const { data: profilesData, error: profilesError } = profiles
      const { data: socialLinksData, error: socialLinksError } = socialLinks

      if (profilesError || socialLinksError) {
        throw Error(profilesError?.message || socialLinksError?.message)
      }

      if (!profilesData || !socialLinksData) {
        throw Error("No profile or social links created in DB")
      }

      return transformPublicProfiles({
        profilesFromDB: profilesData,
        socialLinksFromDB: socialLinksData,
      })
    }
  )
}

export { getPublicProfile, getPublicProfiles }
