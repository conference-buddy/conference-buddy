import React, { ReactElement, useState } from "react"
import useCreateProfile from "../../../services/hooks/profile/useCreateProfile"
import { navigate } from "gatsby"
import useAuthUserContext from "../../../services/hooks/auth-user/useAuthUserContext"
import { TextInput } from "../../text-input/TextInput"
import { SocialLinkInputs } from "../../social-link-inputs/SocialLinkInputs"
import { generateEmptySocialLinks } from "../../../../domain/_social-links/helper/generate-social-links-for-profile"
import { SocialLink } from "../../../../domain/_social-links/types/types-social-links"
import { MarkdownInput } from "../../markdown-input/MarkdownInput"
import { usernameExists } from "../../../../domain/profiles"

function CreateProfile(): ReactElement {
  const { authUser } = useAuthUserContext()
  const [name, setName] = useState(authUser?.user_metadata.full_name)
  const [username, setUsername] = useState(
    authUser?.user_metadata.preferred_username
  )
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    generateEmptySocialLinks()
  )
  const [aboutMeText, setAboutMeText] = useState(
    authUser?.user_metadata.about_text
  )

  const updateSocialLinks = (value: string | undefined, index: number) => {
    const newArray = [...socialLinks]
    newArray[index] = { ...socialLinks[index], value }
    setSocialLinks(newArray)
  }

  function checkUsername(username: string) {
    if (!username) {
      setUsernameAvailable(false)
    }
    const isAlreadyUsed = usernameExists(username)
    setUsernameAvailable(!isAlreadyUsed)
  }

  const createUserMutation = useCreateProfile({
    about_text: aboutMeText,
    email: authUser?.email,
    id: authUser?.id,
    name,
    provider: authUser?.app_metadata.provider,
    social_links: socialLinks,
    username,
  })

  if (createUserMutation.isSuccess) {
    navigate("/profile")
  }

  if (createUserMutation.isError) {
    alert("error")
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        if (!usernameAvailable) return
        createUserMutation.mutate()
      }}
    >
      <section className="bg-white rounded p-3 mb-3">
        <h3>Personal</h3>
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
              onBlur={value => checkUsername(value)}
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
