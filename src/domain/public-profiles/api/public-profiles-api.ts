import { supabase } from "../../_database/supabaseClient"
import { PublicProfile } from "../types/types-public-profile"
import { ProfileDB } from "../../profiles/types/types-profiles"
import {
  transformPublicProfiles,
  transformPublicProfile,
} from "../utils/transform-data"
import {
  getAllSocialLinks,
  getSocialLinksProfile,
} from "../../_social-links/api/social-links-api"

const getPublicProfile = async (
  profileId: string | undefined
): Promise<PublicProfile | null> => {
  if (!profileId) return null

  const profile = supabase
    .from<ProfileDB>("profiles")
    .select("name,username")
    .eq("id", profileId)
    .single()

  const socialLinks = getSocialLinksProfile(profileId)

  //eslint-disable-next-line
  //@ts-ignore
  return Promise.all([profile, socialLinks]).then(([profile, socialLinks]) => {
    const { data: profileData, error: profileError } = profile
    const { data: socialLinksData, error: socialLinksError } = socialLinks

    if (profileError || socialLinksError) {
      throw Error(profileError?.message || socialLinksError?.message)
    }

    if (!profileData || !socialLinksData) {
      throw Error("No profile or social links created in DB")
    }

    return transformPublicProfile({
      profileFromDB: profileData,
      socialLinksFromDB: socialLinksData,
    })
  })
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
