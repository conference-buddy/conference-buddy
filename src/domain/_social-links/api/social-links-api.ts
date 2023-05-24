import { supabase } from "../../_database/supabaseClient"
import { SocialLinksDB } from "../types/types-social-links"

function createSocialLinks({
  profileId,
  socialLinks,
}: {
  profileId: string
  socialLinks: Omit<SocialLinksDB, "id" | "profile_id">
}) {
  const socialLinksForDB: SocialLinksDB = {
    ...socialLinks,
    profile_id: profileId,
  }

  return supabase.from("profiles_social_links").insert([socialLinksForDB])
}

// @TODO should social link stuff outside of this directory always return SocialLinks or does it make sense to have SocialLinksDB returned in some cases?
function getSocialLinksProfile(profileId: string) {
  return supabase
    .from("profiles_social_links")
    .select("github, gitlab, mastodon, twitter, website, linkedin")
    .eq("profile_id", profileId)
    .single()
}

export { createSocialLinks, getSocialLinksProfile }
