import { definitions } from "../../_database/types/supabase"

export type ProfileDB = definitions["profiles"]
export type SocialLinksDB = definitions["profiles_social_links"]
export type SocialLink = Partial<
  Record<keyof Omit<SocialLinksDB, "id">, string>
>

export interface Profile {
  id: string
  created_at: string
  updated_at?: string
  provider: string
  email: string
  name: string
  username: string
  website?: string
  social_links?: SocialLink[]
}
