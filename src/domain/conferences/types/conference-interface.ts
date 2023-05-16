import { Database } from "../../_database/types"

export type ConferenceDB = Database["public"]["Tables"]["conferences"]["Row"]

export type Conference = ConferenceDB
