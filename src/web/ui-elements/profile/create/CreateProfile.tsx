import React, { FormEvent, ReactElement, useState } from "react"
import useCreateProfile from "../../../services/hooks/profile/useCreateProfile"
import { navigate } from "gatsby"
import useAuthUserContext from "../../../services/hooks/auth-user/useAuthUserContext"
import { TextInput } from "../../text-input/TextInput"
import { SocialLinkInputs } from "../../social-link-inputs/SocialLinkInputs"
import { generateEmptySocialLinks } from "../../../../domain/_social-links/helper/generate-social-links-for-profile"
import { SocialLink } from "../../../../domain/_social-links/types/types-social-links"
import { MarkdownInput } from "../../markdown-input/MarkdownInput"
import { CreateAvatar } from "../../image-upload/CreateAvatar"
import { ImageObject } from "../../../services/storage/image-upload-helper"
import { uploadAvatar } from "../../../services/storage/avatar"
import { usernameExists } from "../../../../domain/profiles"

function CreateProfile(): ReactElement {
  const { authUser } = useAuthUserContext()

  const [name, setName] = useState(authUser?.user_metadata.full_name)
  const [username, setUsername] = useState(
    authUser?.user_metadata.preferred_username
  )
  const [aboutMeText, setAboutMeText] = useState(
    authUser?.user_metadata.about_text
  )

  const [avatarFile, setAvatarFile] = useState<ImageObject | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    generateEmptySocialLinks()
  )

  function updateSocialLinks(value: string | undefined, index: number) {
    const newArray = [...socialLinks]
    newArray[index] = { ...socialLinks[index], value }
    setSocialLinks(newArray)
  }

  const createUserMutation = useCreateProfile()

  async function submitUserProfile(event: FormEvent) {
    event.preventDefault()
    const isAlreadyUsed = await usernameExists(username)
    // @TODO better handling, also maybe better on blur,
    // but currently hitting submit without leaving input
    // causes wrong behaviour, fix with flow
    if (isAlreadyUsed) {
      alert("username already exists")
      return
    }

    const avatarUrl = avatarFile ? await uploadAvatar(avatarFile) : null
    console.log(avatarUrl)
    createUserMutation.mutate({
      about_text: aboutMeText,
      email: authUser?.email,
      id: authUser?.id,
      name,
      provider: authUser?.app_metadata.provider,
      social_links: socialLinks,
      username,
      ...(avatarUrl && { avatar_url: avatarUrl }),
    })
  }

  if (createUserMutation.isSuccess) {
    navigate("/profile")
  }

  if (createUserMutation.isError) {
    alert("error")
  }

  return (
    <form onSubmit={submitUserProfile}>
      <section className="bg-white rounded p-3 mb-3">
        <h3>Personal</h3>
        <div className="p-5">
          <h2>AVATAR</h2>
          <CreateAvatar
            onFileAdded={setAvatarFile}
            onFileRemoved={() => setAvatarFile(null)}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <TextInput
              onChange={value => setName(value)}
              label={"🙋 Full Name"}
              placeholder="Your full name"
              required={true}
            />
          </div>

          <div className="col-md-6">
            <TextInput
              onChange={value => setUsername(value)}
              label={"🥷 Username"}
              placeholder="Your preferred username"
              required={true}
            />
          </div>
        </div>

        <MarkdownInput
          value={aboutMeText}
          onChangeInput={setAboutMeText}
          label={"📝 About me"}
          placeholder="Tell others a bit about yourself."
          required={false}
        />
      </section>

      <section className="bg-white rounded p-3 pb-0 mb-3">
        <h3>Social links</h3>
        <div className="row">
          <SocialLinkInputs
            socialLinks={socialLinks}
            onChange={updateSocialLinks}
          />
        </div>
      </section>
      <div className="text-end mb-3">
        <button type="submit" className="btn col-12 btn-confbuddy-green">
          Submit Form
        </button>
      </div>
    </form>
  )
}

export { CreateProfile }
