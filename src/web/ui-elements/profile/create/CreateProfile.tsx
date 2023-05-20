import React, { ReactElement, useEffect, useState } from "react"
import { navigate } from "gatsby"
import { SocialLink, usernameExists } from "../../../../domain/profiles"
import { useAuthUserContext } from "../../../../services/hooks/auth-user/useAuthUserContext"
import useCreateProfile from "../../../../services/hooks/profile/useCreateProfile"
import { TextInput } from "../../text-input/TextInput"
import { MarkdownInput } from "../../markdown-input/MarkdownInput"
import { SocialLinkInputs } from "../../social-link-inputs/SocialLinkInputs"
import { generateEmptySocialLinks } from "../../../../domain/_social-links/helper/generate-social-links-for-profile"

function CreateProfile(): ReactElement {
  const { authUser } = useAuthUserContext()

  const [formValidated, setFormValidated] = useState(false)
  const [name, setName] = useState(authUser?.user_metadata.full_name)
  const [username, setUsername] = useState<string>(
    authUser?.user_metadata.preferred_username || ""
  )

  const [email, setEmail] = useState<string>(authUser?.email || "")
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    generateEmptySocialLinks()
  )
  const [aboutMeText, setAboutMeText] = useState<string | undefined>(undefined)

  useEffect(() => {
    console.log("socialLinks", socialLinks)
  })
  const updateSocialLinks = (address: string | null, index: number) => {
    const newArray = [...socialLinks]
    newArray[index] = { ...socialLinks[index], address }
    setSocialLinks(newArray)
  }

  async function checkUsername(username: string) {
    if (!username) {
      setUsernameAvailable(false)
    }
    const isAlreadyUsed = await usernameExists(username)
    setUsernameAvailable(!isAlreadyUsed)
  }

  const createUserMutation = useCreateProfile({
    about_text: aboutMeText || null,
    email,
    id: authUser?.id || "",
    name,
    provider: authUser?.app_metadata.provider || "",
    social_links: socialLinks,
    username,
  })

  if (createUserMutation.isSuccess) {
    //@TODO notification!
    navigate("/profile")
  }

  if (createUserMutation.isError) {
    //@TOD proper error handling
    alert("error")
  }

  return (
    <form
      className={formValidated ? "was-validated" : ""}
      onSubmit={async event => {
        event.preventDefault()
        await checkUsername(username)
        //@TODO add error handling for username not available
        if (!usernameAvailable) return
        createUserMutation.mutate()
      }}
    >
      <section className="bg-white rounded p-3 mb-3">
        <h3>Personal</h3>
        <div className="row d-flex align-items-center">
          <div className="col-md-6">
            <TextInput
              type={"email"}
              errorMessage={"Please enter a valid email."}
              value={email}
              onChange={value => setEmail(value)}
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
            <TextInput
              errorMessage={"Please enter a full name."}
              onChange={value => setName(value)}
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
              value={username}
              errorMessage={"Please enter a username."}
              onChange={value => setUsername(value)}
              onBlur={value => checkUsername(value)}
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

        <MarkdownInput
          value={aboutMeText}
          onChange={setAboutMeText}
          label={"About me"}
          placeholder="Tell others a bit about yourself."
          required={false}
        />
      </section>

      <fieldset className="bg-white rounded p-3 pb-0 mb-3">
        <h3>Social links</h3>

        <SocialLinkInputs
          socialLinks={socialLinks}
          onChange={updateSocialLinks}
        />
      </fieldset>
      <div className="text-end mb-3">
        <button
          type="submit"
          className="btn col-12 btn-confbuddy-green"
          onClick={() => {
            setFormValidated(true)
          }}
        >
          Submit Form
        </button>
      </div>
    </form>
  )
}

export { CreateProfile }
