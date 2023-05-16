export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      buddy_posts: {
        Row: {
          conference_id: string
          created_at: string
          id: string
          profile_id: string
          text: string
        }
        Insert: {
          conference_id: string
          created_at?: string
          id?: string
          profile_id: string
          text: string
        }
        Update: {
          conference_id?: string
          created_at?: string
          id?: string
          profile_id?: string
          text?: string
        }
      }
      conferences: {
        Row: {
          city: string
          country: string
          created_at: string
          description: string
          end_date: string
          id: string
          name: string
          start_date: string
          updated_at: string | null
          url: string
        }
        Insert: {
          city: string
          country: string
          created_at?: string
          description: string
          end_date: string
          id?: string
          name: string
          start_date: string
          updated_at?: string | null
          url: string
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          description?: string
          end_date?: string
          id?: string
          name?: string
          start_date?: string
          updated_at?: string | null
          url?: string
        }
      }
      profiles: {
        Row: {
          about_text: string | null
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string
          provider: string
          updated_at: string | null
          username: string
        }
        Insert: {
          about_text?: string | null
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          name: string
          provider: string
          updated_at?: string | null
          username: string
        }
        Update: {
          about_text?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          provider?: string
          updated_at?: string | null
          username?: string
        }
      }
      profiles_social_links: {
        Row: {
          github: string | null
          gitlab: string | null
          id: string
          instagram: string | null
          linkedin: string | null
          twitter: string | null
          website: string | null
        }
        Insert: {
          github?: string | null
          gitlab?: string | null
          id: string
          instagram?: string | null
          linkedin?: string | null
          twitter?: string | null
          website?: string | null
        }
        Update: {
          github?: string | null
          gitlab?: string | null
          id?: string
          instagram?: string | null
          linkedin?: string | null
          twitter?: string | null
          website?: string | null
        }
      }
      subscriptions: {
        Row: {
          conference_id: string
          created_at: string
          id: string
          profile_id: string
          type: string
        }
        Insert: {
          conference_id: string
          created_at?: string
          id?: string
          profile_id: string
          type: string
        }
        Update: {
          conference_id?: string
          created_at?: string
          id?: string
          profile_id?: string
          type?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
