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

  social_links: z.object({
    github: z.string().optional(),
    gitlab: z.string().optional(),
    mastodon: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    website: z.string().optional(),
  }),
})

type FormSchema = z.infer<typeof schema>

const socialLinksMap: Record<
  SocialLink["platform"],
  { name: SocialLink["platformName"]; icon: string }
> = {
  github: { name: "GitHub", icon: "🐙" },
  gitlab: { name: "GitLab", icon: "🦊" },
  mastodon: { name: "Mastodon", icon: "🐘" },
  linkedin: { name: "LinkedIn", icon: "👥" },
  twitter: { name: "Twitter", icon: "🐦" },
  website: { name: "Website", icon: "🌐" },
}
function getSocialLinkIcon(platform: string | SocialLink["platform"]): string {
  return socialLinksMap.hasOwnProperty(platform)
    ? socialLinksMap[platform as SocialLink["platform"]].icon
    : ""
}

function getSocialLinkName(platform: string | SocialLink["platform"]): string {
  return socialLinksMap.hasOwnProperty(platform)
    ? socialLinksMap[platform as SocialLink["platform"]].name
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

  const createProfile = useCreateProfile()

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
      const newProfile: ProfileCreate = {
        ...data,
        about_text: data.about_text ? data.about_text : null,
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

  return (
    <form className="has-validation" onSubmit={handleSubmit(onSubmit, onError)}>
      <section className="bg-white rounded p-3 mb-3">
        <h3>Personal</h3>
        <section className="row d-flex align-items-center">
          <div className="row d-flex align-items-center">
            <div className="col-md-6">
              <TextInput<FormSchema>
                register={register}
                name={"email"}
                type={"email"}
                validated={Boolean(touchedFields.email)}
                error={errors?.email?.message as string}
                label={
                  <>
                    <span aria-hidden={true}>📬</span> Email (only visible for
                    you)
                  </>
                }
                placeholder="you@email.provider"
                required={true}
              />
            </div>
            <div className="col-md-6">
              We're <b>not</b> displaying your email anywhere. It is used to
              notify you about new post for conferences you're subscribed to.
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
                    <span aria-hidden={true}>🙋</span> Full Name
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
                    <span aria-hidden={true}>🥷</span> Username
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
        </section>

        <fieldset className="bg-white rounded p-3 pb-0 mb-3">
          <h3>Social links</h3>
          <div className="input-group mb-5 row">
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
                        <span aria-hidden={"true"}>
                          {getSocialLinkIcon(platform)}
                        </span>{" "}
                        {getSocialLinkName(platform)}{" "}
                      </>
                    }
                    placeholder="you@email.provider"
                  />
                </div>
              )
            })}
          </div>
        </fieldset>
      </section>

      <div className="row col-md-6 offset-md-3 mb-3">
        <button type="submit" className={"btn btn-primary btn-lg"}>
          Submit Form
        </button>
      </div>
    </form>
  )
}

export { CreateProfile }
