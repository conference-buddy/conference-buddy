import { createProfile, ProfileCreate } from "../../../domain/profiles"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useCreateProfile() {
  const queryClient = useQueryClient()
  const { mutate } = useMutation((data: ProfileCreate) => createProfile(data), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["profile"])
    },
  })
  return mutate
}
