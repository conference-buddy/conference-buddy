import { Database } from "../../_database/types"

type SocialLinksDB =
  Database["public"]["Tables"]["profiles_social_links"]["Row"]

type SocialLink = {
  platform: keyof Omit<SocialLinksDB, "id">
  platformName: string
  address: string | null
}

export { SocialLinksDB, SocialLink }
