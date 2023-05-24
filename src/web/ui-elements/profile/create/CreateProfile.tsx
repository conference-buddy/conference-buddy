import React, { ReactElement } from "react"
import {
  ProfileCreate,
  SocialLink,
  usernameExists,
} from "../../../../domain/profiles"
import { AuthUser } from "@supabase/supabase-js"
import { Controller, FieldErrors, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { TextInput } from "../../text-input/TextInput"
import { MarkdownInput } from "../../markdown-input/MarkdownInput"
import { SocialLinksDB } from "../../../../domain/_social-links/types/types-social-links"
import useCreateProfile from "../../../../services/hooks/profile/useCreateProfile"
import { CreateAvatar } from "../../image-upload/CreateAvatar"
import { ImageObject } from "../../../../services/storage/create-image-object"
import { uploadAvatar } from "../../../../services/storage/avatar"
import { navigate } from "gatsby"
import {
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandLinkedin,
  IconBrandMastodon,
  IconBrandTwitter,
  IconId,
  IconMail,
  IconWorld,
  IconWritingSign,
} from "@tabler/icons-react"

type CreateProfileProps = {
  authUser: AuthUser
}

const userNameRegex = /^[a-zA-Z0-9_-]+$/

const schema = z.object({
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

type FormSchema = z.infer<typeof schema>

const socialLinksMap: Record<
  SocialLink["platform"],
  {
    name: SocialLink["platformName"]
    icon: () => React.ReactElement
    pattern: string
  }
> = {
  github: {
    name: "GitHub",
    icon: () => <IconBrandGithub aria-hidden="true" />,
    pattern: "https://github.com/username",
  },
  gitlab: {
    name: "GitLab",
    icon: () => <IconBrandGitlab color="#fc6d26" aria-hidden="true" />,
    pattern: "https://github.com/username",
  },
  mastodon: {
    name: "Mastodon",
    icon: () => <IconBrandMastodon color="#595aff" aria-hidden="true" />,
    pattern: "https://instance.io/@username",
  },
  linkedin: {
    name: "LinkedIn",
    icon: () => <IconBrandLinkedin color="#0A66C2" aria-hidden="true" />,
    pattern: "https://www.linkedin.com/in/username",
  },
  twitter: {
    name: "Twitter",
    icon: () => <IconBrandTwitter color="#1DA1F2" aria-hidden="true" />,
    pattern: "https://twitter.com/username",
  },
  website: {
    name: "Website",
    icon: () => <IconWorld aria-hidden="true" />,
    pattern: "you@email.provider",
  },
}
function getSocialLinkIcon(
  platform: string | SocialLink["platform"]
): () => React.ReactElement {
  return socialLinksMap.hasOwnProperty(platform)
    ? socialLinksMap[platform as SocialLink["platform"]].icon
    : () => <IconWorld aria-hidden="true" />
}

function getSocialLinkName(platform: string | SocialLink["platform"]): string {
  return socialLinksMap.hasOwnProperty(platform)
    ? socialLinksMap[platform as SocialLink["platform"]].name
    : ""
}

function getSocialLinkPattern(
  platform: string | SocialLink["platform"]
): string {
  return socialLinksMap.hasOwnProperty(platform)
    ? socialLinksMap[platform as SocialLink["platform"]].pattern
    : ""
}

function CreateProfile({ authUser }: CreateProfileProps): ReactElement {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    watch,
    formState: { errors, touchedFields },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      id: authUser.id,
      provider: authUser.app_metadata.provider,
    },
  })

  watch("social_links")

  const { mutate: createProfile, isSuccess } = useCreateProfile()

  const onSubmit = async (data: FormSchema) => {
    const userNameTaken = await usernameExists(data.username)

    if (userNameTaken) {
      setError(
        "username",
        {
          message:
            "Sorry, the username already exists. Please choose a different one.",
        },
        { shouldFocus: true }
      )
    } else {
      let avatarUrl: null | string = null
      if (data.avatar_image) {
        avatarUrl = await uploadAvatar(data.avatar_image)
      }
      const newProfile: ProfileCreate = {
        ...data,
        about_text: data.about_text ? data.about_text : null,
        avatar_url: avatarUrl,
        social_links: Object.entries(data.social_links).reduce(
          (acc, [key, value]) => {
            return { ...acc, [key]: value ? value : null }
          },
          {} as Omit<SocialLinksDB, "id">
        ),
      }
      createProfile(newProfile)
    }
  }

  const onError = (errors: FieldErrors<FormSchema>) => {
    //@todo add better error handling
    console.log(errors)
  }

  if (isSuccess) {
    navigate(`/user/${getValues("username")}`)
  }

  return (
    <form className="has-validation" onSubmit={handleSubmit(onSubmit, onError)}>
      <section className="card p-3 mb-3">
        <h3>Your picture</h3>
        <p>
          You can upload a profile picture if you want. Otherwise, you will keep
          the 🐶 placeholder :)
        </p>
        <div className="row d-flex align-items-center mb-5 p-3">
          <Controller<FormSchema>
            name="avatar_image"
            control={control}
            render={({ field }) => {
              return (
                <CreateAvatar
                  imageFile={field.value as ImageObject | undefined}
                  onChange={newImage => {
                    setValue("avatar_image", newImage, {
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }}
                />
              )
            }}
          />
        </div>
        <h3>Personal</h3>
        <div className="mb-3">
          <div className="row d-flex align-items-center mb-3">
            <div className="col-md-6">
              <TextInput<FormSchema>
                register={register}
                name={"email"}
                type={"email"}
                validated={Boolean(touchedFields.email)}
                error={errors?.email?.message as string}
                label={
                  <>
                    <IconMail aria-hidden="true" /> Email (only visible for you)
                  </>
                }
                placeholder="you@email.provider"
                required={true}
              />
            </div>
            <div className="col-md-6 small ">
              We're <b>not</b> displaying your email anywhere. We want to add
              optional notifications per email later. You won't be subscribed to
              this notifications without your consent!
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <TextInput<FormSchema>
                register={register}
                name={"name"}
                validated={Boolean(touchedFields.name)}
                error={errors?.name?.message as string}
                label={
                  <>
                    <IconId aria-hidden="true" /> Full Name
                  </>
                }
                placeholder="Your full name"
                required={true}
              />
            </div>
            <div className="col-md-6">
              <TextInput
                register={register}
                name={"username"}
                validated={Boolean(touchedFields.username)}
                error={errors?.username?.message as string}
                label={
                  <>
                    <IconWritingSign aria-hidden="true" /> Username
                  </>
                }
                placeholder="Your preferred username"
                required={true}
              />
            </div>
          </div>
          <Controller<FormSchema>
            name="about_text"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <MarkdownInput
                  value={field.value as string | undefined}
                  onChange={text => {
                    const value = text ? (text as string) : undefined
                    setValue("about_text", value, {
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }}
                  onBlur={text => {
                    const value = text ? (text as string) : undefined
                    setValue("about_text", value, {
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }}
                  label={"About me"}
                  placeholder="Tell others a bit about yourself."
                  required={false}
                  validated={Boolean(fieldState.isTouched && field.value)}
                  error={errors?.about_text?.message as string}
                />
              )
            }}
          />
        </div>

        <fieldset className="pb-0 mb-5 mt-3">
          <h3>Social links</h3>
          <div className="row">
            {Object.keys(socialLinksMap).map((key, index) => {
              const platform = key as keyof FormSchema["social_links"]
              return (
                <div className={"col-12 col-md-6"} key={index}>
                  <TextInput<FormSchema>
                    register={register}
                    name={`social_links.${platform}`}
                    type={"text"}
                    validated={Boolean(
                      getValues(`social_links.${platform}`) &&
                        touchedFields?.social_links?.[platform]
                    )}
                    error={errors?.social_links?.[platform]?.message as string}
                    label={
                      <>
                        {getSocialLinkIcon(platform)()}{" "}
                        {getSocialLinkName(platform)}{" "}
                      </>
                    }
                    placeholder={getSocialLinkPattern(platform)}
                  />
                </div>
              )
            })}
          </div>
        </fieldset>
      </section>

      <div className="row mb-3">
        <div className="col-md-6 col-sm-12 offset-md-3">
          <button type="submit" className="btn btn-primary btn-lg w-100">
            Create profile
          </button>
        </div>
      </div>
    </form>
  )
}

export { CreateProfile }
