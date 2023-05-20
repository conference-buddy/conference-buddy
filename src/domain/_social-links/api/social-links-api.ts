import { supabase } from "../../_database/supabaseClient"

import { flattenSocialLinks } from "../helper/flattenSocialLinksForDB"
import { SocialLink, SocialLinksDB } from "../types/types-social-links"

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

  return supabase.from("profiles_social_links").insert([socialLinksForDB])
}

// @TODO should social link stuff outside of this directory always return SocialLinks or does it make sense to have SocialLinksDB returned in some cases?
function getSocialLinksProfile(profileId: string) {
  return supabase
    .from("profiles_social_links")
    .select()
    .eq("id", profileId)
    .single()
}

export { createSocialLinks, getSocialLinksProfile }
