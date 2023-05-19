import { Profile, SocialLink } from "../../profiles"

export type PublicProfileDB = Pick<
  Profile,
  "name" | "username" | "about_text" | "id"
>
export type PublicProfile = PublicProfileDB & {
  social_links: SocialLink[]
}
