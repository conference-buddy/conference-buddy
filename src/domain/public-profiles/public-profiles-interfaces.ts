import { Profile } from "../profiles/profiles-interface"

export type PublicProfile = Omit<
  Profile,
  "updated_at" | "id" | "provider" | "email"
>
