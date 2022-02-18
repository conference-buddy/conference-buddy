import { definitions } from "../../_database/types/supabase"

export type SocialLinksDB = definitions["profiles_social_links"]

export type SocialLink = {
  platform: keyof Omit<SocialLinksDB, "id">
  platformName: string
  linkForm: "url" | "username"
  value?: string
}
