import { supabase } from "../_database/supabaseClient"
import { SocialLinksDB } from "../profiles/types/types-profiles"

function getAllSocialLinks(id: string) {
  return supabase.from<SocialLinksDB>("profiles_social_links").insert([
    {
      id: id,
      twitter: "Twitter Name",
    },
  ])
}

export { getAllSocialLinks }
