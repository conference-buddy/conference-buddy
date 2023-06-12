import { Database } from "../../_database/types"
import { Prettify } from "../../../services/type-utils/type-utils"

type BuddyPostDB = Database["public"]["Tables"]["buddy_posts"]["Row"]

type BuddyPostWithProfile = BuddyPostDB & {
  profile: { username: string; avatar_url: string | null } | null
}

type BuddyPostOfUser = Prettify<
  BuddyPostDB & {
    conference: { name: string } | null
  }
>

export type { BuddyPostDB, BuddyPostWithProfile, BuddyPostOfUser }
