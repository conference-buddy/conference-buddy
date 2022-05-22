import { useMutation } from "react-query"
import {
  deleteAvatar,
  updateAvatarUrlInProfile,
} from "../../../../domain/profiles/api/avatar-api"

export default function useDeleteAvatar(profileId: string) {
  // const queryClient = useQueryClient()
  return useMutation(
    (mutationParams: { avatarUrl: string }) =>
      deleteAvatar(mutationParams.avatarUrl),
    {
      onSuccess: async () => {
        // await queryClient.invalidateQueries(["profile"])
        await updateAvatarUrlInProfile({ profileId, avatarUrl: null })
      },
    }
  )
}
