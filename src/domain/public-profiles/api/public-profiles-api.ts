import { supabase } from "../../_database/supabaseClient"
import { PublicProfile } from "../types/types-public-profile"
import { transformPublicProfile } from "../utils/transform-data"
import { getSocialLinksProfile } from "../../_social-links/api/social-links-api"

const getPublicProfile = async (
  username: string
): Promise<PublicProfile | null> => {
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(
      `
        id,
        name,
        username,
        about_text, 
        avatar_url,
        social_links:profiles_social_links(
            *
        )
    `
    )
    .eq("username", username)
    .single()

  if (profileError) {
    throw profileError
  }

  const { data: socialLinks, error: socialLinksError } =
    await getSocialLinksProfile(profile.id)

  if (socialLinksError) {
    throw socialLinksError
  }

  return transformPublicProfile({
    publicProfileFromDB: profile,
    socialLinksFromDB: socialLinks,
  })
}

export { getPublicProfile }
