import { useMutation, useQueryClient } from "react-query"
import { updateAvatarUrlInProfile } from "../../../../domain/profiles/api/avatar-api"
import { ImageObject } from "../../storage/image-upload-helper"
import { uploadAvatar } from "../../storage/avatar"

export default function useUpdateAvatar(profileId: string) {
  const queryClient = useQueryClient()

  return useMutation(
    async (avatarFile: ImageObject) => {
      return uploadAvatar(avatarFile)
    },
    {
      onSuccess: async (avatarUrl: string) => {
        await updateAvatarUrlInProfile({
          avatarUrl: avatarUrl,
          profileId,
        })
        await queryClient.invalidateQueries(["profile"])
      },
    }
  )
}
