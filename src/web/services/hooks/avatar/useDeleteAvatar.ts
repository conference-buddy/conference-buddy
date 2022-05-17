import { useMutation } from "react-query"
import {
  deleteAvatar,
  updateAvatarUrl,
} from "../../../../domain/profiles/api/avatar-api"

export default function useDeleteAvatar(profileId: string) {
  // const queryClient = useQueryClient()
  return useMutation(
    (mutationParams: { avatarUrl: string }) =>
      deleteAvatar(mutationParams.avatarUrl),
    {
      onSuccess: async () => {
        // await queryClient.invalidateQueries(["profile"])
        await updateAvatarUrl({ profileId, avatarUrl: null })
      },
    }
  )
}
