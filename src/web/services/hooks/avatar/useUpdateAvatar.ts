import { useMutation, useQueryClient } from "react-query"
import { updateAvatarUrlInProfile } from "../../../../domain/profiles/api/avatar-api"
import { ImageObject } from "../../storage/image-upload-helper"
import { uploadAvatar } from "../../storage/avatar"

export default function useUpdateAvatar(profileId: string) {
  const queryClient = useQueryClient()

  return useMutation(
    (mutationParams: { avatarFile: ImageObject }) => {
      return uploadAvatar(mutationParams.avatarFile)
    },
    {
      onSuccess: async (avatarUrl: string) => {
        await queryClient.invalidateQueries(["profile"])
        await updateAvatarUrlInProfile({
          avatarUrl: avatarUrl,
          profileId,
        })
        console.log(avatarUrl)
      },
    }
  )
}
