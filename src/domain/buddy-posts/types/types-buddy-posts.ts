import { Database } from "../../_database/types"

export type BuddyPostDB = Database["public"]["Tables"]["buddy_posts"]["Row"]
export type BuddyPostWithProfile = BuddyPostDB & {
  profile: { username: string; avatar_url: string | null } | null
}
