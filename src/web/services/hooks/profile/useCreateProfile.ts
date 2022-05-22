import { useMutation, useQueryClient } from "react-query"
import { Profile } from "../../../../domain/profiles"
import { createProfile } from "../../../../domain/profiles"

export default function useCreateProfile() {
  const queryClient = useQueryClient()

  return useMutation(
    (profile: Omit<Profile, "created_at">) => createProfile({ ...profile }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["profile"])
      },
    }
  )
}
