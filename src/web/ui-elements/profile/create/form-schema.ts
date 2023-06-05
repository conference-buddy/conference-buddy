import * as z from "zod"

const userNameRegex = /^[a-zA-Z0-9_-]+$/

const createProfileSchema = z.object({
  about_text: z.string().optional(),
  email: z
    .string()
    .nonempty("Please add a email address for notification.")
    .email("This does not look like a valid email."),
  id: z.string(),
  name: z.string().min(1, { message: "Please add a name." }),
  provider: z.string(),
  username: z
    .string()
    .min(3, { message: "Please add a user name with at least 3 characters." })
    .regex(userNameRegex, {
      message: "Username can only contain letters, numbers, underscore, dash.",
    }),
  avatar_image: z.any().optional(),
  social_links: z.object({
    github: z
      .string()
      .url({ message: "This does not look like a valid url." })
      .optional()
      .or(z.literal("")),
    gitlab: z
      .string()
      .url({ message: "This does not look like a valid url." })
      .optional()
      .or(z.literal("")),
    mastodon: z
      .string()
      .url({ message: "This does not look like a valid url." })
      .optional()
      .or(z.literal("")),
    linkedin: z
      .string()
      .url({ message: "This does not look like a valid url." })
      .optional()
      .or(z.literal("")),
    twitter: z
      .string()
      .url({ message: "This does not look like a valid url." })
      .optional()
      .or(z.literal("")),
    website: z
      .string()
      .url({ message: "This does not look like a valid url." })
      .optional()
      .or(z.literal("")),
  }),
})

const updateProfileSchema = createProfileSchema
  .omit({ id: true, avatar_image: true, username: true, provider: true })
  .merge(z.object({ avatar_url: z.string().optional() }))

type CreateProfileFormSchema = z.infer<typeof createProfileSchema>
type UpdateProfileFormSchema = z.infer<typeof updateProfileSchema>

export { createProfileSchema, updateProfileSchema }
export type { CreateProfileFormSchema, UpdateProfileFormSchema }
