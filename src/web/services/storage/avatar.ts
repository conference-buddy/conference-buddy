import { v4 as uuid } from "uuid"
import { supabase } from "../../../domain/_database/supabaseClient"
import { ImageObject } from "./image-upload-helper"

export function createAvatarUr(fileName: string) {
  return `public/${uuid()}-${fileName}`
}

// These handles the avatar _storage_
// maybe find a better place for that later
export async function uploadAvatar(
  avatarFile: ImageObject
): Promise<string | null> {
  const avatarUrl = createAvatarUr(avatarFile.name)
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(avatarUrl, avatarFile.file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) {
    throw new Error(error.message)
  }
  return data?.Key || null
}

export async function deleteAvatar(avatarUrl: string) {
  await supabase.storage.from("avatars").remove([avatarUrl])
}

export function getPublicAvatarUrl(avatarUrl: string): string | null {
  const { publicURL, error } = supabase.storage
    .from("avatars")
    .getPublicUrl(avatarUrl)

  if (error) {
    throw new Error(error.message)
  }

  return publicURL
}
