import { Database } from "../../_database/types"

type SocialLinksDB = Prettify<
  Database["public"]["Tables"]["profiles_social_links"]["Row"]
>

type SocialLink = Prettify<{
  platform: keyof Omit<SocialLinksDB, "id" | "profile_id">
  platformName: string
  address: string | null
}>

export { SocialLinksDB, SocialLink }
