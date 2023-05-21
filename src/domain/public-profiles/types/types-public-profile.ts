import { Profile, SocialLink } from "../../profiles"

export type PublicProfileDB = Pick<
  Profile,
  "name" | "username" | "about_text" | "id" | "avatar_url"
>
export type PublicProfile = PublicProfileDB & {
  social_links: SocialLink[]
}
