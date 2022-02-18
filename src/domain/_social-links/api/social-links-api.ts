import { supabase } from "../../_database/supabaseClient"
import { SocialLink, SocialLinksDB } from "../types/types-social-links"

function flattenSocialLinks(
  socialLinks: SocialLink[]
): Omit<SocialLinksDB, "id"> {
  return socialLinks.reduce((acc, val) => {
    Object.assign(acc, val)
    return acc
  }, {})
}

function createSocialLinks({
  profileId,
  socialLinks,
}: {
  profileId: string
  socialLinks: SocialLink[]
}) {
  const socialLinksForDB: SocialLinksDB = {
    id: profileId,
    ...flattenSocialLinks(socialLinks),
  }

  return supabase
    .from<SocialLinksDB>("profiles_social_links")
    .insert([socialLinksForDB])
}

function getAllSocialLinks() {
  return supabase.from<SocialLinksDB>("profiles_social_links")
}

// @TODO should social link stuff outside of this directory always return SocialLinks or does it make sense to have SocialLinksDB returned in some cases?
function getSocialLinksProfile(profileId: string) {
  return supabase
    .from<SocialLinksDB>("profiles_social_links")
    .select()
    .eq("id", profileId)
    .single()
}

export { createSocialLinks, getAllSocialLinks, getSocialLinksProfile }
