import React, { ReactElement } from "react"
import { Profile, SocialLink } from "../../../../domain/profiles"
import useUpdateProfile from "../../../../services/hooks/profile/useUpdateProfile"
import { UpdateAvatar } from "../../image-upload/UpdateAvatar"
import { navigate } from "gatsby"
import { SocialLinksDB } from "../../../../domain/_social-links/types/types-social-links"
import { ProfileUpdate } from "../../../../domain/profiles/types/types-profiles"
import { IconId, IconMail, IconWritingSign } from "@tabler/icons-react"
import {
  UpdateProfileFormSchema,
  updateProfileSchema,
} from "../create/form-schema"
import {
  Form,
  FormMarkdownEditor,
  FormTextInput,
  SubmitButton,
  useForm,
} from "../../form/form-wrapper/Form"
import {
  getSocialLinkIcon,
  getSocialLinkName,
  getSocialLinkPattern,
  socialLinksMap,
} from "../profile-helper/profile-helper"
import { FieldErrors } from "react-hook-form"

function UpdateProfile({ profile }: { profile: Profile }): ReactElement {
  const socialLinkMap = profile.social_links.reduce(
    (acc: Record<SocialLink["platform"], string | null>, curr: SocialLink) => {
      return { ...acc, [curr.platform]: curr.address }
    },
    {} as Record<SocialLink["platform"], string | null>
  )

  const form = useForm<UpdateProfileFormSchema>({
    schema: updateProfileSchema,
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

  const { mutate: updateProfile, isSuccess, isError } = useUpdateProfile()

  async function onSubmitForm(userInput: UpdateProfileFormSchema) {
    const newProfile: ProfileUpdate = {
      about_text: userInput.about_text ? userInput.about_text : null,
      email: userInput.email,
      id: profile.id,
      name: userInput.name,
      social_links: Object.entries(userInput.social_links).reduce(
        (acc, [key, value]) => {
          return { ...acc, [key]: value ? value : null }
        },
        {} as Omit<SocialLinksDB, "id">
      ),
    }

    await updateProfile(newProfile)
  }

  const onError = (errors: FieldErrors<UpdateProfileFormSchema>) => {
    //@todo add better error handling
    console.log(errors)
  }

  if (isSuccess) {
    navigate(`/profile`)
  }

  if (isError) {
    //@todo add better error handling
    console.log(errors)
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

      <Form
        {...form}
        onSubmit={onSubmitForm}
        onError={onError}
        ariaLabel={"Update your profile"}
      >
        <section className="card p-3 mb-3">
          <h3>Personal</h3>
          <div className=" mb-3">
            <div className="row d-flex align-items-center">
              <div className="col-md-6">
                <FormTextInput<UpdateProfileFormSchema>
                  name={"email"}
                  type={"email"}
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
                <FormTextInput<UpdateProfileFormSchema>
                  name={"name"}
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
            <FormMarkdownEditor<UpdateProfileFormSchema>
              name={"about_text"}
              label={"About me"}
              placeholder="Tell others a bit about yourself."
            />
          </div>

          <fieldset className="pb-0 mb-5 mt-3">
            <h3>Social links</h3>
            <div className="row">
              {Object.keys(socialLinksMap).map((key, index) => {
                const platform =
                  key as keyof UpdateProfileFormSchema["social_links"]
                return (
                  <div className={"col-12 col-md-6"} key={index}>
                    <FormTextInput<UpdateProfileFormSchema>
                      name={`social_links.${platform}`}
                      isNested={true}
                      type={"text"}
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
          <div className="row mb-3">
            <div className="col-md-6 col-sm-12 offset-md-3">
              <SubmitButton className={"btn-lg"} text={"Update profile"} />
            </div>
          </div>
        </section>
      </Form>
    </div>
  )
}

export { UpdateProfile }
