import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ImageObject } from "../../storage/create-image-object"
import { uploadAvatar } from "../../storage/avatar"
import { updateAvatarUrlInProfile } from "../../../domain/profiles"

export default function useUpdateAvatar(profileId: string) {
  const queryClient = useQueryClient()

  return useMutation(
    (mutationParams: { avatarFile: ImageObject }) => {
      return uploadAvatar(mutationParams.avatarFile)
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
