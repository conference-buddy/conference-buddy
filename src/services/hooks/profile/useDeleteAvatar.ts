import { deleteAvatar } from "../../storage/avatar"
import { updateAvatarUrlInProfile } from "../../../domain/profiles/api/avatar-api"
import { useMutation } from "@tanstack/react-query"

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
