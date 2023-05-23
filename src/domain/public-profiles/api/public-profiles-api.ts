import { supabase } from "../../_database/supabaseClient"
import { PublicProfile } from "../types/types-public-profile"
import { transformPublicProfile } from "../utils/transform-data"
import { getSocialLinksProfile } from "../../_social-links/api/social-links-api"

const getPublicProfile = async ({
  username,
  profileId,
}: {
  username?: string
  profileId?: string
}): Promise<PublicProfile | null> => {
  if (!username && !profileId) {
    console.error("username or profileId needed")
    return null
  }

  const query = supabase.from("profiles").select(
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

  if (username) {
    query.eq("username", username)
  } else {
    query.eq("id", profileId)
  }
  const { data: profile, error: profileError } = await query.single()

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
