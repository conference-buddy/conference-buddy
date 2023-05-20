import React, { ReactElement } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { useAuthUserContext } from "../../../services/hooks/auth-user/useAuthUserContext"
import usePublicProfile from "../../../services/hooks/public-profile/usePublicProfile"
import { navigate } from "gatsby"

function UserPage(): ReactElement {
  const { authUser, isLoading: authUserIsLoading } = useAuthUserContext()
  const { data: user, isError } = usePublicProfile(authUser?.id)

  if (!authUserIsLoading && !authUser) {
    navigate("/")
    return <></>
  }

  if (!user) {
    return <></>
  }

  //@ add proper error handling
  if (isError) {
    return <div>Oh no</div>
  }

  return (
    <>
      <div className="container p-5">
        <h1>Meet your fellow Conference Buddy</h1>
      </div>
      <div className="container p-5 bg-white mb-3">
        <h2 className="text-center">{user?.name}</h2>
        <hr className="text-confbuddy-pink" />
        <div className="row pt-4">
          <div className="col-4">
            <StaticImage
              src={`../../assets/images/avatar_placeholder.png`}
              alt={"placeholder"}
              placeholder="blurred"
            />
          </div>
          <div className="col-8">
            <>about text</>
          </div>
        </div>
      </div>
      <div className="container bg-white">
        <div className="row">
          <div className="col p-5">
            <h3>NEXT: I'm a 🐶 Buddy at:</h3>
            <li>Conference name</li>
            <li>Conference name</li>
            <li>Conference name</li>
          </div>
          <div className="col p-5">
            <h3>Previous was a 🐶 Buddy at:</h3>
            <li>Conference name</li>
            <li>Conference name</li>
            <li>Conference name</li>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserPage
