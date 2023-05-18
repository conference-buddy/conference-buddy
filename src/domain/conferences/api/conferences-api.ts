import { supabase } from "../../_database/supabaseClient"
import { Conference } from "../types/conference-interface"
import { Paginated } from "../../domain-types-utils"

function getPagination({ page, size }: { page: number; size: number }) {
  const currentPage = page > 0 ? page - 1 : 0
  const from = currentPage ? currentPage * size : 0
  const to = currentPage ? from + size - 1 : size - 1

  return { from, to }
}

type GetConferencesParams = {
  page: number
  searchTerm?: string
  entriesPerPage: number
}
async function getConferences(): Promise<Conference[]> {
  const { data, error } = await supabase
    .from("conferences")
    .select("*")
    .order("start_date", { ascending: true })

  if (error) {
    //@TODO proper error handling
    console.error(error)
  }

  if (!data) {
    //@TODO proper error handling
    throw new Error("Conferences not found")
  }

  return data
}

async function getConferencesPaginated({
  page,
  searchTerm,
  entriesPerPage,
}: GetConferencesParams): Promise<Paginated<Conference[]> | unknown> {
  const { from, to } = getPagination({ page, size: entriesPerPage })

  let supabaseQuery = supabase
    .from("conferences")
    .select("*", { count: "exact" })

  if (searchTerm) {
    supabaseQuery = supabaseQuery.or(
      `city.ilike.%${searchTerm}%,country.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%`
    )
  }

  const {
    data: conferences,
    error,
    count,
  } = await supabaseQuery
    .range(from, to)
    .order("start_date", { ascending: true })

  if (error) {
    if (error.message === "Requested range not satisfiable") {
      //@TODO proper error handling
      console.error("Page not found")
      console.error(error)
    }
    console.error(error)
  }

  if (!conferences) {
    //@TODO proper error handling
    throw new Error("Conferences not found")
  }

  const totalPages = count === null ? 1 : Math.ceil(count / entriesPerPage)
  const response: Paginated<Conference[]> = {
    currentPage: page,
    totalAmount: count || 0,
    totalPages,
    entries: conferences,
  }
  return response
}

export { getConferences, getConferencesPaginated }
