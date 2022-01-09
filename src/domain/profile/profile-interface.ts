export interface Profile {
  id: string
  created_at: string
  updated_at: string
  provider: string
  email: string
  name: string
  username: string
  website?: string
}

export type ProfilePublic = Omit<
  Profile,
  "updated_at" | "id" | "provider" | "email"
>
