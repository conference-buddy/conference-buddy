import { useMutation, useQueryClient } from "react-query"
import { Profile } from "../../../../domain/profiles/profiles-interface"
import { createProfile } from "../../../../domain/profiles/api/profile-api"

export default function useCreateProfile(profile: Profile) {
  const queryClient = useQueryClient()
  return useMutation(() => createProfile(profile), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["profile"])
    },
  })
}
