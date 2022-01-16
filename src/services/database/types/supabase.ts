/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown
      }
    }
  }
  "/buddy_posts": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.buddy_posts.id"]
          created_at?: parameters["rowFilter.buddy_posts.created_at"]
          text?: parameters["rowFilter.buddy_posts.text"]
          conference_id?: parameters["rowFilter.buddy_posts.conference_id"]
          profile_id?: parameters["rowFilter.buddy_posts.profile_id"]
          /** Filtering Columns */
          select?: parameters["select"]
          /** Ordering */
          order?: parameters["order"]
          /** Limiting and Pagination */
          offset?: parameters["offset"]
          /** Limiting and Pagination */
          limit?: parameters["limit"]
        }
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"]
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"]
          /** Preference */
          Prefer?: parameters["preferCount"]
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions["buddy_posts"][]
        }
        /** Partial Content */
        206: unknown
      }
    }
    post: {
      parameters: {
        body: {
          /** buddy_posts */
          buddy_posts?: definitions["buddy_posts"]
        }
        query: {
          /** Filtering Columns */
          select?: parameters["select"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** Created */
        201: unknown
      }
    }
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.buddy_posts.id"]
          created_at?: parameters["rowFilter.buddy_posts.created_at"]
          text?: parameters["rowFilter.buddy_posts.text"]
          conference_id?: parameters["rowFilter.buddy_posts.conference_id"]
          profile_id?: parameters["rowFilter.buddy_posts.profile_id"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.buddy_posts.id"]
          created_at?: parameters["rowFilter.buddy_posts.created_at"]
          text?: parameters["rowFilter.buddy_posts.text"]
          conference_id?: parameters["rowFilter.buddy_posts.conference_id"]
          profile_id?: parameters["rowFilter.buddy_posts.profile_id"]
        }
        body: {
          /** buddy_posts */
          buddy_posts?: definitions["buddy_posts"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
  }
  "/conferences": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.conferences.id"]
          created_at?: parameters["rowFilter.conferences.created_at"]
          updated_at?: parameters["rowFilter.conferences.updated_at"]
          name?: parameters["rowFilter.conferences.name"]
          start_date?: parameters["rowFilter.conferences.start_date"]
          end_date?: parameters["rowFilter.conferences.end_date"]
          city?: parameters["rowFilter.conferences.city"]
          country?: parameters["rowFilter.conferences.country"]
          description?: parameters["rowFilter.conferences.description"]
          url?: parameters["rowFilter.conferences.url"]
          /** Filtering Columns */
          select?: parameters["select"]
          /** Ordering */
          order?: parameters["order"]
          /** Limiting and Pagination */
          offset?: parameters["offset"]
          /** Limiting and Pagination */
          limit?: parameters["limit"]
        }
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"]
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"]
          /** Preference */
          Prefer?: parameters["preferCount"]
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions["conferences"][]
        }
        /** Partial Content */
        206: unknown
      }
    }
    post: {
      parameters: {
        body: {
          /** conferences */
          conferences?: definitions["conferences"]
        }
        query: {
          /** Filtering Columns */
          select?: parameters["select"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** Created */
        201: unknown
      }
    }
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.conferences.id"]
          created_at?: parameters["rowFilter.conferences.created_at"]
          updated_at?: parameters["rowFilter.conferences.updated_at"]
          name?: parameters["rowFilter.conferences.name"]
          start_date?: parameters["rowFilter.conferences.start_date"]
          end_date?: parameters["rowFilter.conferences.end_date"]
          city?: parameters["rowFilter.conferences.city"]
          country?: parameters["rowFilter.conferences.country"]
          description?: parameters["rowFilter.conferences.description"]
          url?: parameters["rowFilter.conferences.url"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.conferences.id"]
          created_at?: parameters["rowFilter.conferences.created_at"]
          updated_at?: parameters["rowFilter.conferences.updated_at"]
          name?: parameters["rowFilter.conferences.name"]
          start_date?: parameters["rowFilter.conferences.start_date"]
          end_date?: parameters["rowFilter.conferences.end_date"]
          city?: parameters["rowFilter.conferences.city"]
          country?: parameters["rowFilter.conferences.country"]
          description?: parameters["rowFilter.conferences.description"]
          url?: parameters["rowFilter.conferences.url"]
        }
        body: {
          /** conferences */
          conferences?: definitions["conferences"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
  }
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"]
          updated_at?: parameters["rowFilter.profiles.updated_at"]
          name?: parameters["rowFilter.profiles.name"]
          username?: parameters["rowFilter.profiles.username"]
          provider?: parameters["rowFilter.profiles.provider"]
          email?: parameters["rowFilter.profiles.email"]
          created_at?: parameters["rowFilter.profiles.created_at"]
          /** Filtering Columns */
          select?: parameters["select"]
          /** Ordering */
          order?: parameters["order"]
          /** Limiting and Pagination */
          offset?: parameters["offset"]
          /** Limiting and Pagination */
          limit?: parameters["limit"]
        }
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"]
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"]
          /** Preference */
          Prefer?: parameters["preferCount"]
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][]
        }
        /** Partial Content */
        206: unknown
      }
    }
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"]
        }
        query: {
          /** Filtering Columns */
          select?: parameters["select"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** Created */
        201: unknown
      }
    }
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"]
          updated_at?: parameters["rowFilter.profiles.updated_at"]
          name?: parameters["rowFilter.profiles.name"]
          username?: parameters["rowFilter.profiles.username"]
          provider?: parameters["rowFilter.profiles.provider"]
          email?: parameters["rowFilter.profiles.email"]
          created_at?: parameters["rowFilter.profiles.created_at"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"]
          updated_at?: parameters["rowFilter.profiles.updated_at"]
          name?: parameters["rowFilter.profiles.name"]
          username?: parameters["rowFilter.profiles.username"]
          provider?: parameters["rowFilter.profiles.provider"]
          email?: parameters["rowFilter.profiles.email"]
          created_at?: parameters["rowFilter.profiles.created_at"]
        }
        body: {
          /** profiles */
          profiles?: definitions["profiles"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
  }
  "/profiles_social_links": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles_social_links.id"]
          website?: parameters["rowFilter.profiles_social_links.website"]
          github?: parameters["rowFilter.profiles_social_links.github"]
          gitlab?: parameters["rowFilter.profiles_social_links.gitlab"]
          twitter?: parameters["rowFilter.profiles_social_links.twitter"]
          yotube?: parameters["rowFilter.profiles_social_links.yotube"]
          instagramm?: parameters["rowFilter.profiles_social_links.instagramm"]
          tiktok?: parameters["rowFilter.profiles_social_links.tiktok"]
          linkedin?: parameters["rowFilter.profiles_social_links.linkedin"]
          /** Filtering Columns */
          select?: parameters["select"]
          /** Ordering */
          order?: parameters["order"]
          /** Limiting and Pagination */
          offset?: parameters["offset"]
          /** Limiting and Pagination */
          limit?: parameters["limit"]
        }
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"]
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"]
          /** Preference */
          Prefer?: parameters["preferCount"]
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles_social_links"][]
        }
        /** Partial Content */
        206: unknown
      }
    }
    post: {
      parameters: {
        body: {
          /** profiles_social_links */
          profiles_social_links?: definitions["profiles_social_links"]
        }
        query: {
          /** Filtering Columns */
          select?: parameters["select"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** Created */
        201: unknown
      }
    }
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles_social_links.id"]
          website?: parameters["rowFilter.profiles_social_links.website"]
          github?: parameters["rowFilter.profiles_social_links.github"]
          gitlab?: parameters["rowFilter.profiles_social_links.gitlab"]
          twitter?: parameters["rowFilter.profiles_social_links.twitter"]
          yotube?: parameters["rowFilter.profiles_social_links.yotube"]
          instagramm?: parameters["rowFilter.profiles_social_links.instagramm"]
          tiktok?: parameters["rowFilter.profiles_social_links.tiktok"]
          linkedin?: parameters["rowFilter.profiles_social_links.linkedin"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles_social_links.id"]
          website?: parameters["rowFilter.profiles_social_links.website"]
          github?: parameters["rowFilter.profiles_social_links.github"]
          gitlab?: parameters["rowFilter.profiles_social_links.gitlab"]
          twitter?: parameters["rowFilter.profiles_social_links.twitter"]
          yotube?: parameters["rowFilter.profiles_social_links.yotube"]
          instagramm?: parameters["rowFilter.profiles_social_links.instagramm"]
          tiktok?: parameters["rowFilter.profiles_social_links.tiktok"]
          linkedin?: parameters["rowFilter.profiles_social_links.linkedin"]
        }
        body: {
          /** profiles_social_links */
          profiles_social_links?: definitions["profiles_social_links"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
  }
  "/subscriptions": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.subscriptions.id"]
          created_at?: parameters["rowFilter.subscriptions.created_at"]
          profile_id?: parameters["rowFilter.subscriptions.profile_id"]
          conference_id?: parameters["rowFilter.subscriptions.conference_id"]
          type?: parameters["rowFilter.subscriptions.type"]
          /** Filtering Columns */
          select?: parameters["select"]
          /** Ordering */
          order?: parameters["order"]
          /** Limiting and Pagination */
          offset?: parameters["offset"]
          /** Limiting and Pagination */
          limit?: parameters["limit"]
        }
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"]
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"]
          /** Preference */
          Prefer?: parameters["preferCount"]
        }
      }
      responses: {
        /** OK */
        200: {
          schema: definitions["subscriptions"][]
        }
        /** Partial Content */
        206: unknown
      }
    }
    post: {
      parameters: {
        body: {
          /** subscriptions */
          subscriptions?: definitions["subscriptions"]
        }
        query: {
          /** Filtering Columns */
          select?: parameters["select"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** Created */
        201: unknown
      }
    }
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.subscriptions.id"]
          created_at?: parameters["rowFilter.subscriptions.created_at"]
          profile_id?: parameters["rowFilter.subscriptions.profile_id"]
          conference_id?: parameters["rowFilter.subscriptions.conference_id"]
          type?: parameters["rowFilter.subscriptions.type"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.subscriptions.id"]
          created_at?: parameters["rowFilter.subscriptions.created_at"]
          profile_id?: parameters["rowFilter.subscriptions.profile_id"]
          conference_id?: parameters["rowFilter.subscriptions.conference_id"]
          type?: parameters["rowFilter.subscriptions.type"]
        }
        body: {
          /** subscriptions */
          subscriptions?: definitions["subscriptions"]
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"]
        }
      }
      responses: {
        /** No Content */
        204: never
      }
    }
  }
  "/rpc/handle_new_user_social_links": {
    post: {
      parameters: {
        body: {
          args: { [key: string]: unknown }
        }
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"]
        }
      }
      responses: {
        /** OK */
        200: unknown
      }
    }
  }
}

export interface definitions {
  buddy_posts: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string
    /** Format: text */
    text: string
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `conferences.id`.<fk table='conferences' column='id'/>
     */
    conference_id: string
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    profile_id: string
  }
  conferences: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    updated_at: string
    /** Format: text */
    name: string
    /** Format: date */
    start_date: string
    /** Format: date */
    end_date: string
    /** Format: text */
    city: string
    /** Format: text */
    country: string
    /** Format: text */
    description: string
    /** Format: text */
    url: string
  }
  profiles: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string
    /** Format: timestamp with time zone */
    updated_at?: string
    /** Format: text */
    name: string
    /** Format: text */
    username: string
    /** Format: text */
    provider: string
    /** Format: text */
    email: string
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string
  }
  /** @description Social links for user profiles */
  profiles_social_links: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string
    /** Format: text */
    website?: string
    /** Format: text */
    github?: string
    /** Format: text */
    gitlab?: string
    /** Format: text */
    twitter?: string
    /** Format: text */
    yotube?: string
    /** Format: text */
    instagramm?: string
    /** Format: text */
    tiktok?: string
    /** Format: text */
    linkedin?: string
  }
  subscriptions: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    profile_id: string
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `conferences.id`.<fk table='conferences' column='id'/>
     */
    conference_id: string
    /** Format: text */
    type: string
  }
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object"
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none"
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none"
  /** @description Filtering Columns */
  select: string
  /** @description On Conflict */
  on_conflict: string
  /** @description Ordering */
  order: string
  /** @description Limiting and Pagination */
  range: string
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string
  /** @description Limiting and Pagination */
  offset: string
  /** @description Limiting and Pagination */
  limit: string
  /** @description buddy_posts */
  "body.buddy_posts": definitions["buddy_posts"]
  /** Format: uuid */
  "rowFilter.buddy_posts.id": string
  /** Format: timestamp with time zone */
  "rowFilter.buddy_posts.created_at": string
  /** Format: text */
  "rowFilter.buddy_posts.text": string
  /** Format: uuid */
  "rowFilter.buddy_posts.conference_id": string
  /** Format: uuid */
  "rowFilter.buddy_posts.profile_id": string
  /** @description conferences */
  "body.conferences": definitions["conferences"]
  /** Format: uuid */
  "rowFilter.conferences.id": string
  /** Format: timestamp with time zone */
  "rowFilter.conferences.created_at": string
  /** Format: timestamp with time zone */
  "rowFilter.conferences.updated_at": string
  /** Format: text */
  "rowFilter.conferences.name": string
  /** Format: date */
  "rowFilter.conferences.start_date": string
  /** Format: date */
  "rowFilter.conferences.end_date": string
  /** Format: text */
  "rowFilter.conferences.city": string
  /** Format: text */
  "rowFilter.conferences.country": string
  /** Format: text */
  "rowFilter.conferences.description": string
  /** Format: text */
  "rowFilter.conferences.url": string
  /** @description profiles */
  "body.profiles": definitions["profiles"]
  /** Format: uuid */
  "rowFilter.profiles.id": string
  /** Format: timestamp with time zone */
  "rowFilter.profiles.updated_at": string
  /** Format: text */
  "rowFilter.profiles.name": string
  /** Format: text */
  "rowFilter.profiles.username": string
  /** Format: text */
  "rowFilter.profiles.provider": string
  /** Format: text */
  "rowFilter.profiles.email": string
  /** Format: timestamp with time zone */
  "rowFilter.profiles.created_at": string
  /** @description profiles_social_links */
  "body.profiles_social_links": definitions["profiles_social_links"]
  /** Format: uuid */
  "rowFilter.profiles_social_links.id": string
  /** Format: text */
  "rowFilter.profiles_social_links.website": string
  /** Format: text */
  "rowFilter.profiles_social_links.github": string
  /** Format: text */
  "rowFilter.profiles_social_links.gitlab": string
  /** Format: text */
  "rowFilter.profiles_social_links.twitter": string
  /** Format: text */
  "rowFilter.profiles_social_links.yotube": string
  /** Format: text */
  "rowFilter.profiles_social_links.instagramm": string
  /** Format: text */
  "rowFilter.profiles_social_links.tiktok": string
  /** Format: text */
  "rowFilter.profiles_social_links.linkedin": string
  /** @description subscriptions */
  "body.subscriptions": definitions["subscriptions"]
  /** Format: uuid */
  "rowFilter.subscriptions.id": string
  /** Format: timestamp with time zone */
  "rowFilter.subscriptions.created_at": string
  /** Format: uuid */
  "rowFilter.subscriptions.profile_id": string
  /** Format: uuid */
  "rowFilter.subscriptions.conference_id": string
  /** Format: text */
  "rowFilter.subscriptions.type": string
}

export interface operations {}

export interface external {}
