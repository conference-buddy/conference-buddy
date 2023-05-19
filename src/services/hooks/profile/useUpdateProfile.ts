import { Profile, updateProfile } from "../../../domain/profiles"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useUpdateProfile(profile: Profile) {
  const queryClient = useQueryClient()
  return useMutation(() => updateProfile(profile), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["profile"])
    },
  })
}
