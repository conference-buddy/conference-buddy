import { supabase } from "../../_database/supabaseClient"

async function updateAvatarUrlInProfile({
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

export { updateAvatarUrlInProfile }
