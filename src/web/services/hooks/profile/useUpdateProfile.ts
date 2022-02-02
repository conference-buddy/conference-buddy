import { useMutation, useQueryClient } from "react-query"
import { Profile, updateProfile } from "../../../../domain/profiles"

export default function useUpdateProfile(profile: Profile) {
  const queryClient = useQueryClient()
  return useMutation(() => updateProfile(profile), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["profile"])
    },
  })
}
