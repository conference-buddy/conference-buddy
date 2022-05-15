import { supabase } from "../../_database/supabaseClient"
import { v4 as uuid } from "uuid"

async function updateAvatarUrl(
  profileId: string,
  avatarUrl: string | null
): Promise<void> {
  const { error: insertError } = await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .match({ id: profileId })

  if (insertError) {
    throw new Error(insertError.message)
  }
}

async function getPublicAvatarUrl(avatarUrl: string): Promise<string | null> {
  const { publicURL, error } = supabase.storage
    .from("avatars")
    .getPublicUrl(avatarUrl)

  if (error) {
    throw new Error(error.message)
  }

  return publicURL
}

async function uploadAvatar(newImage: any): Promise<{ Key: string } | null> {
  const imageName = `public/${newImage.name}-${uuid()}`
  const { data: insertData, error: insertError } = await supabase.storage
    .from("avatars")
    .upload(imageName, newImage.file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (insertError) {
    throw new Error(insertError.message)
  }

  return insertData
}

async function deleteAvatar(avatarName: string) {
  await supabase.storage.from("avatars").remove([`public/${avatarName}`])
}

export { updateAvatarUrl, getPublicAvatarUrl, uploadAvatar, deleteAvatar }
