import React, { ReactElement } from "react"
import { useAuthUserContext } from "../../../services/hooks/auth-user/useAuthUserContext"
import usePublicProfile from "../../../services/hooks/public-profile/usePublicProfile"
import { navigate } from "gatsby"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import { AvatarImage } from "../../ui-elements/profile/AvatarImage"
import SociasLinks from "../../ui-elements/profile/SociasLinks"
import { BuddyPostsOfUser } from "../../ui-elements/buddy-posts/BuddyPostsOfUser"

function UserPage({
  params,
}: {
  params: Record<string, string>
}): ReactElement {
  const { authUser, isLoading: authUserIsLoading } = useAuthUserContext()
  const { data: user, isError } = usePublicProfile({
    username: params.username,
    enabled: Boolean(authUser),
  })

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
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-3">
            <div className="card border-0">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <AvatarImage
                    avatarUrl={user.avatar_url}
                    height={200}
                    width={200}
                  ></AvatarImage>
                  <div className="mt-3">
                    <h4>{user?.name}</h4>
                  </div>
                </div>
                <hr className="text-confbuddy-pink" />
                <SociasLinks socialLinks={user?.social_links}></SociasLinks>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card border-0 mb-3">
              <div className="card-body">
                <h4>About me</h4>
                {user.about_text}
              </div>
            </div>

            <div className="card border-0">
              <div className="card-body">
                <h4>Was buddy at conference</h4>
                <BuddyPostsOfUser profileId={user.id}></BuddyPostsOfUser>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserPage

export const Head = () => {
  return <PageHead title={"Welcome"} />
}
