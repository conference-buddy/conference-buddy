import { useMutation, useQueryClient } from "react-query"
import { Profile } from "../../../../domain/profiles"
import { createProfile } from "../../../../domain/profiles"

export default function useCreateProfile(profile: Omit<Profile, "created_at">) {
  const queryClient = useQueryClient()
  return useMutation(() => createProfile(profile), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["profile"])
    },
  })
}
