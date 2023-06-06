import React, { ReactElement } from "react"
import { ProfileCreate, usernameExists } from "../../../../domain/profiles"
import { AuthUser } from "@supabase/supabase-js"
import { SocialLinksDB } from "../../../../domain/_social-links/types/types-social-links"
import useCreateProfile from "../../../../services/hooks/profile/useCreateProfile"
import { CreateAvatar } from "../../image-upload/CreateAvatar"
import { ImageObject } from "../../../../services/storage/create-image-object"
import { uploadAvatar } from "../../../../services/storage/avatar"
import { navigate } from "gatsby"
import { IconId, IconMail, IconWritingSign } from "@tabler/icons-react"
import {
  Form,
  FormMarkdownEditor,
  FormTextInput,
  SubmitButton,
  useForm,
} from "../../form/form-wrapper/Form"
import { Controller } from "react-hook-form"
import { CreateProfileFormSchema, createProfileSchema } from "./form-schema"
import {
  getSocialLinkIcon,
  getSocialLinkName,
  getSocialLinkPattern,
  socialLinksMap,
} from "../profile-helper/profile-helper"

type CreateProfileProps = {
  authUser: AuthUser
}

function CreateProfile({ authUser }: CreateProfileProps): ReactElement {
  const form = useForm<CreateProfileFormSchema>({
    schema: createProfileSchema,
    defaultValues: {
      id: authUser.id,
      provider: authUser.app_metadata.provider,
    },
  })

  form.watch("social_links")

  const { mutate: createProfile, isSuccess } = useCreateProfile()

  async function onSubmitForm(userInput: CreateProfileFormSchema) {
    const userNameTaken = await usernameExists(userInput.username)

    if (userNameTaken) {
      form.setError(
        "username",
        {
          message:
            "Sorry, the username already exists. Please choose a different one.",
        },
        { shouldFocus: true }
      )
    } else {
      let avatarUrl: null | string = null
      if (userInput.avatar_image) {
        avatarUrl = await uploadAvatar(userInput.avatar_image)
      }
      const newProfile: ProfileCreate = {
        ...userInput,
        about_text: userInput.about_text ? userInput.about_text : null,
        avatar_url: avatarUrl,
        social_links: Object.entries(userInput.social_links).reduce(
          (acc, [key, value]) => {
            return { ...acc, [key]: value ? value : null }
          },
          {} as Omit<SocialLinksDB, "id">
        ),
      }
      createProfile(newProfile)
    }
  }

  if (isSuccess) {
    navigate(`/user/${form.getValues("username")}`)
  }

  return (
    <Form {...form} onSubmit={onSubmitForm} ariaLabel={"Create your profile"}>
      <section className="card p-3 mb-3">
        <h3>Your picture</h3>
        <p>
          You can upload a profile picture if you want. Otherwise, you will keep
          the 🐶 placeholder :)
        </p>
        <div className="row d-flex align-items-center mb-5 p-3">
          <Controller<CreateProfileFormSchema>
            name="avatar_image"
            control={form.control}
            render={({ field }) => {
              return (
                <CreateAvatar
                  imageFile={field.value as ImageObject | undefined}
                  onChange={newImage => {
                    form.setValue("avatar_image", newImage, {
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
              <FormTextInput<CreateProfileFormSchema>
                name={"email"}
                type={"email"}
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
              <FormTextInput<CreateProfileFormSchema>
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
              <FormTextInput
                name={"username"}
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
          <FormMarkdownEditor<CreateProfileFormSchema>
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
                key as keyof CreateProfileFormSchema["social_links"]
              return (
                <div className={"col-12 col-md-6"} key={index}>
                  <FormTextInput<CreateProfileFormSchema>
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
      </section>

      <div className="row mb-3">
        <div className="col-md-6 col-sm-12 offset-md-3">
          <SubmitButton className={"btn-lg"} text={"Create profile"} />
        </div>
      </div>
    </Form>
  )
}

export { CreateProfile }
