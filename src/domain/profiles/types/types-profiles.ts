import { SocialLink } from "../../_social-links/types/types-social-links"
import { Database } from "../../_database/types"

export type ProfileDB = Database["public"]["Tables"]["profiles"]["Row"]

export interface Profile extends ProfileDB {
  social_links: SocialLink[]
}
