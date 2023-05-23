import { Database } from "../../_database/types"

type DiscussionPostDB = Database["public"]["Tables"]["discussion_post"]["Row"]

type DiscussionPost = DiscussionPostDB

export type { DiscussionPost }
