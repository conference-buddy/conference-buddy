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
        Relationships: [
          {
            foreignKeyName: "buddy_posts_conference_id_fkey"
            columns: ["conference_id"]
            referencedRelation: "conferences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "buddy_posts_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
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
          slug: string
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
          slug: string
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
          slug?: string
          start_date?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      conferences_tags_junction: {
        Row: {
          conference_id: string
          created_at: string
          id: string
          tag_id: string
        }
        Insert: {
          conference_id: string
          created_at?: string
          id?: string
          tag_id: string
        }
        Update: {
          conference_id?: string
          created_at?: string
          id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conferences_tags_junction_conference_id_fkey"
            columns: ["conference_id"]
            referencedRelation: "conferences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conferences_tags_junction_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      discussion_posts: {
        Row: {
          created_at: string
          discussion_id: string
          id: string
          profile_id: string
          text: string
        }
        Insert: {
          created_at?: string
          discussion_id: string
          id?: string
          profile_id: string
          text: string
        }
        Update: {
          created_at?: string
          discussion_id?: string
          id?: string
          profile_id?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_posts_discussion_id_fkey"
            columns: ["discussion_id"]
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussion_posts_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      discussions: {
        Row: {
          conference_id: string
          created_at: string | null
          id: string
        }
        Insert: {
          conference_id: string
          created_at?: string | null
          id?: string
        }
        Update: {
          conference_id?: string
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussions_conference_id_fkey"
            columns: ["conference_id"]
            referencedRelation: "conferences"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles_social_links: {
        Row: {
          github: string | null
          gitlab: string | null
          id: string
          linkedin: string | null
          mastodon: string | null
          profile_id: string
          twitter: string | null
          website: string | null
        }
        Insert: {
          github?: string | null
          gitlab?: string | null
          id?: string
          linkedin?: string | null
          mastodon?: string | null
          profile_id: string
          twitter?: string | null
          website?: string | null
        }
        Update: {
          github?: string | null
          gitlab?: string | null
          id?: string
          linkedin?: string | null
          mastodon?: string | null
          profile_id?: string
          twitter?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_social_links_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          conference_id: string | null
          created_at: string
          discussion_id: string | null
          id: string
          profile_id: string
        }
        Insert: {
          conference_id?: string | null
          created_at?: string
          discussion_id?: string | null
          id?: string
          profile_id: string
        }
        Update: {
          conference_id?: string | null
          created_at?: string
          discussion_id?: string | null
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_conference_id_fkey"
            columns: ["conference_id"]
            referencedRelation: "conferences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_discussion_id_fkey"
            columns: ["discussion_id"]
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          color: string | null
          created_at: string
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_conferences: {
        Args: {
          conference_search_term: string
        }
        Returns: {
          city: string
          country: string
          created_at: string
          description: string
          end_date: string
          id: string
          name: string
          slug: string
          start_date: string
          updated_at: string | null
          url: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
