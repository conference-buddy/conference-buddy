import { useMutation, useQueryClient } from "react-query"
import {
  updateAvatarUrl,
  uploadAvatar,
} from "../../../../domain/profiles/api/avatar-api"
import { v4 as uuid } from "uuid"

export default function useUpdateAvatar(profileId: string) {
  const queryClient = useQueryClient()

  return useMutation(
    async (mutationParams: { file: any; avatarName: string }) => {
      const imageName = `public/${uuid()}-${mutationParams.avatarName}`

      await uploadAvatar({ file: mutationParams.file, avatarName: imageName })
      return imageName
    },
    {
      onSuccess: async (avatarName: string) => {
        await updateAvatarUrl({
          avatarUrl: avatarName,
          profileId,
        })
        await queryClient.invalidateQueries(["profile"])
      },
    }
  )
}
