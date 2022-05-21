import { useMutation, useQueryClient } from "react-query"
import { Profile } from "../../../../domain/profiles"
import { createProfile } from "../../../../domain/profiles"
import { v4 as uuid } from "uuid"
import { uploadAvatar } from "../../../../domain/profiles/api/avatar-api"

export default function useCreateProfile(
  profile: Omit<Profile, "created_at">,
  avatarFile?: File
) {
  const avatarUrl = profile.avatar_url
    ? `public/${uuid()}-${profile.avatar_url}`
    : undefined
  const queryClient = useQueryClient()
  return useMutation(
    () => createProfile({ ...profile, avatar_url: avatarUrl }),
    {
      onSuccess: async () => {
        if (avatarFile && profile.avatar_url) {
          await uploadAvatar({
            file: avatarFile,
            avatarName: profile.avatar_url,
          })
        }
        await queryClient.invalidateQueries(["profile"])
      },
    }
  )
}
