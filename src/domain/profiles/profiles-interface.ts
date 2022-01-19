type SocialLink = {
  platform: string
  url: string
}
export interface Profile {
  id: string
  created_at: string
  updated_at: string
  provider: string
  email: string
  name: string
  username: string
  website?: string
  social_links?: SocialLink[]
}
