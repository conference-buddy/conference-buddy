import { updateProfile } from "../../../domain/profiles"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ProfileUpdate } from "../../../domain/profiles/types/types-profiles"

export default function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation((profile: ProfileUpdate) => updateProfile(profile), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["profile"])
    },
  })
}
