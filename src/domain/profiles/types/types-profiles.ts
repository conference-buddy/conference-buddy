import {
  SocialLink,
  SocialLinksDB,
} from "../../_social-links/types/types-social-links"
import { Database } from "../../_database/types"

type ProfileDB = Prettify<Database["public"]["Tables"]["profiles"]["Row"]>

type Profile = Prettify<
  ProfileDB & {
    social_links: SocialLink[]
  }
>

type ProfileUpdate = Prettify<
  Omit<
    Profile,
    | "created_at"
    | "updated_at"
    | "social_links"
    | "avatar_url"
    | "provider"
    | "username"
  > & {
    social_links: Omit<SocialLinksDB, "id">
  }
>

type ProfileCreate = Prettify<
  Omit<Profile, "created_at" | "updated_at" | "social_links"> & {
    social_links: Omit<SocialLinksDB, "id">
  }
>

export { ProfileDB, Profile, ProfileCreate, ProfileUpdate }
