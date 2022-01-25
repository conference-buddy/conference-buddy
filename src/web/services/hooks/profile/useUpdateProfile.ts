import { useMutation, useQueryClient } from "react-query"
import { Profile } from "../../../../domain/profiles"
import { updateProfile } from "../../../../domain/profiles/api/profile-api"

export default function useUpdateProfile(profile: Profile) {
  const queryClient = useQueryClient()
  return useMutation(() => updateProfile(profile), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["profile"])
    },
  })
}
