import React, { ReactElement } from "react"
import usePublicProfile from "../../../services/hooks/public-profile/usePublicProfile"
import { navigate } from "gatsby"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import useProfile from "../../../services/hooks/profile/useProfile"
import { AvatarImage } from "../../ui-elements/profile/AvatarImage"
import { SocialLinks } from "../../ui-elements/profile/SocialLinks"
import { BuddyPostsOfUser } from "../../ui-elements/buddy-posts/BuddyPostsOfUser"

function UserPage({
  params,
}: {
  params: Record<string, string>
}): ReactElement {
  const { data: profile, isLoading } = useProfile()

  const { data: user, isError } = usePublicProfile({
    username: params.username,
    enabled: Boolean(!isLoading && profile),
  })

  if (!isLoading && !profile) {
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
            <div className="card">
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
                <SocialLinks socialLinks={user?.social_links}></SocialLinks>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-3">
              <div className="card-body">
                <h4>About me</h4>
                {user.about_text}
              </div>
            </div>

            <div className="card">
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
  return <PageHead title={"User"} />
}
