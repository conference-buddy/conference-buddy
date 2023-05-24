import React, { ReactElement } from "react"
import { Profile, SocialLink } from "../../../../domain/profiles"
import useUpdateProfile from "../../../../services/hooks/profile/useUpdateProfile"
import { UpdateAvatar } from "../../image-upload/UpdateAvatar"
import * as z from "zod"
import { Controller, FieldErrors, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TextInput } from "../../text-input/TextInput"
import { MarkdownInput } from "../../markdown-input/MarkdownInput"
import { navigate } from "gatsby"
import { SocialLinksDB } from "../../../../domain/_social-links/types/types-social-links"
import { ProfileUpdate } from "../../../../domain/profiles/types/types-profiles"
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

const schema = z.object({
  about_text: z.string().optional(),
  email: z
    .string()
    .nonempty("Please add a email address for notification.")
    .email("This does not look like a valid email."),
  name: z.string().min(1, { message: "Please add a name." }),
  avatar_url: z.string().optional(),
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
  { name: SocialLink["platformName"]; icon: () => React.ReactElement }
> = {
  github: {
    name: "GitHub",
    icon: () => <IconBrandGithub aria-hidden="true" />,
  },
  gitlab: {
    name: "GitLab",
    icon: () => <IconBrandGitlab color="#fc6d26" aria-hidden="true" />,
  },
  mastodon: {
    name: "Mastodon",
    icon: () => <IconBrandMastodon color="#595aff" aria-hidden="true" />,
  },
  linkedin: {
    name: "LinkedIn",
    icon: () => <IconBrandLinkedin color="#0A66C2" aria-hidden="true" />,
  },
  twitter: {
    name: "Twitter",
    icon: () => <IconBrandTwitter color="#1DA1F2" aria-hidden="true" />,
  },
  website: { name: "Website", icon: () => <IconWorld aria-hidden="true" /> },
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
function UpdateProfile({ profile }: { profile: Profile }): ReactElement {
  const socialLinkMap = profile.social_links.reduce((acc, curr) => {
    return { ...acc, [curr.platform]: curr.address }
  }, {} as Record<SocialLink["platform"], string | null>)

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, touchedFields },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      email: profile.email,
      about_text: profile.about_text || undefined,
      name: profile.name,
      avatar_url: profile.avatar_url || undefined,
      social_links: {
        github: socialLinkMap["github"] || undefined,
        gitlab: socialLinkMap["gitlab"] || undefined,
        mastodon: socialLinkMap["mastodon"] || undefined,
        linkedin: socialLinkMap["linkedin"] || undefined,
        twitter: socialLinkMap["twitter"] || undefined,
        website: socialLinkMap["website"] || undefined,
      },
    },
  })

  const { mutate: updateProfile, isSuccess } = useUpdateProfile()

  const onSubmit = async (data: FormSchema) => {
    const newProfile: ProfileUpdate = {
      about_text: data.about_text ? data.about_text : null,
      email: data.email,
      id: profile.id,
      name: data.name,
      social_links: Object.entries(data.social_links).reduce(
        (acc, [key, value]) => {
          return { ...acc, [key]: value ? value : null }
        },
        {} as Omit<SocialLinksDB, "id">
      ),
    }
    updateProfile(newProfile)
  }

  const onError = (errors: FieldErrors<FormSchema>) => {
    //@todo add better error handling
    console.log(errors)
  }

  if (isSuccess) {
    navigate(`/profile`)
  }

  return (
    <div>
      <h1 className={"mb-2"}>Edit profile</h1>

      <section className="card p-3 mb-3">
        <h3>Your picture</h3>
        <p>
          Delete or update your picture. To upload a new one, you have to delete
          the existing picture first.
        </p>
        <UpdateAvatar
          avatarUrl={profile.avatar_url}
          profileId={profile.id}
          maxWidth={"250px"}
        />
      </section>

      <form
        className="has-validation pt-5"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <section className="card p-3 mb-3">
          <h3>Personal</h3>
          <div className=" mb-3">
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
                      <IconMail aria-hidden="true" /> Email (only visible for
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
                      <IconId aria-hidden="true" /> Full Name
                    </>
                  }
                  placeholder="Your full name"
                  required={true}
                />
              </div>
              <div className="col-md-6">
                <div className="mb-5">
                  <label
                    htmlFor={"username-field"}
                    className="form-label col-form-label mb-0"
                  >
                    <IconWritingSign aria-hidden="true" /> Username
                  </label>
                  <input
                    id={"username-field"}
                    disabled={true}
                    type={"text"}
                    className={"form-control"}
                    placeholder={profile.username}
                  />
                </div>
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
                      error={
                        errors?.social_links?.[platform]?.message as string
                      }
                      label={
                        <>
                          {getSocialLinkIcon(platform)()}{" "}
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
          <div className="row mb-3">
            <div className="col-md-6 col-sm-12 offset-md-3">
              <button type="submit" className="btn btn-primary btn-lg w-100">
                Update profile
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}

export { UpdateProfile }
