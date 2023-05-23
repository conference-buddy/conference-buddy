import { Database } from "../../_database/types"

type DiscussionPostDB = Database["public"]["Tables"]["discussion_posts"]["Row"]

type DiscussionPost = DiscussionPostDB

type DiscussionPostCreate = Prettify<Omit<DiscussionPost, "id" | "created_at">>

export type { DiscussionPost, DiscussionPostCreate }
