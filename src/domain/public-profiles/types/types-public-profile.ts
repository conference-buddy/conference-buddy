import { Profile } from "../../profiles"

export type PublicProfile = Omit<
  Profile,
  "updated_at" | "id" | "provider" | "email"
>
