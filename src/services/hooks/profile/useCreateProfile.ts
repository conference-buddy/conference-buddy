import { createProfile, Profile } from "../../../domain/profiles"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useCreateProfile(
  profile: Omit<Profile, "created_at" | "avatar_url" | "updated_at">
) {
  const queryClient = useQueryClient()
  return useMutation(() => createProfile(profile), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["profile"])
    },
  })
}
