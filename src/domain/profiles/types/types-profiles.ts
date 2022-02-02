import { definitions } from "../../_database/types/supabase"

export type ProfileDB = definitions["profiles"]
export type SocialLinksDB = definitions["profiles_social_links"]
export type SocialLink = Partial<
  Record<keyof Omit<SocialLinksDB, "id">, string>
>

export interface Profile extends ProfileDB {
  social_links?: SocialLink[]
}
