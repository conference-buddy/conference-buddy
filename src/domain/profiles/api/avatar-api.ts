import { supabase } from "../../_database/supabaseClient"

async function updateAvatarUrl({
  avatarUrl,
  profileId,
}: {
  avatarUrl: string | null
  profileId: string
}): Promise<void> {
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

async function uploadAvatar(params: {
  avatarName: string
  file: any
}): Promise<{ Key: string } | null> {
  const { data: insertData, error: insertError } = await supabase.storage
    .from("avatars")
    .upload(params.avatarName, params.file, {
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
