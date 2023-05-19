import { supabase } from "../../_database/supabaseClient"
import { PublicProfile } from "../types/types-public-profile"
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
    .from("profiles")
    .select("id,name,username,about_text")
    .eq("id", profileId)
    .single()

  const socialLinks = getSocialLinksProfile(profileId)

  //eslint-disable-next-line
  //@ts-ignore
  return await Promise.all([profile, socialLinks])
    .then(([profile, socialLinks]) => {
      const { data: publicProfileFromDB } = profile
      const { data: socialLinksFromDB } = socialLinks

      if (!socialLinksFromDB || !publicProfileFromDB) {
        throw Error("social links or profile missing")
      }
      return transformPublicProfile({
        publicProfileFromDB,
        socialLinksFromDB,
      })
    })
    .catch(error => {
      throw Error(error)
    })
}

const getPublicProfiles = async (): Promise<PublicProfile[] | undefined> => {
  const profiles = supabase
    .from("profiles")
    .select("id,created_at,name,username,about_text")
  const socialLinks = getAllSocialLinks()

  return await Promise.all([profiles, socialLinks])
    .then(([profiles, socialLinks]) => {
      const { data: publicProfileFromDB } = profiles
      const { data: socialLinksFromDB } = socialLinks

      console.log("👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋")
      console.log("here")
      console.log("👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋")

      if (!publicProfileFromDB || !socialLinksFromDB) {
        throw Error("No profile or social links created in DB")
      }

      return transformPublicProfiles({
        publicProfilesFromDB: publicProfileFromDB,
        socialLinksFromDB,
      })
    })
    .catch(error => {
      console.log("👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋")
      console.log("oh no")
      console.log("👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋 👋")
      throw Error(error)
    })
}

export { getPublicProfile, getPublicProfiles }
