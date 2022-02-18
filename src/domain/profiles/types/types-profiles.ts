import { definitions } from "../../_database/types/supabase"
import { SocialLink } from "../../_social-links/types/types-social-links"

export type ProfileDB = definitions["profiles"]

export interface Profile extends ProfileDB {
  social_links: SocialLink[]
}
