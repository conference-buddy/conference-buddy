import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"
import useProfile from "../../../services/hooks/profile/useProfile"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import { BuddyPostsOfUser } from "../../ui-elements/buddy-posts/BuddyPostsOfUser"
import { AvatarImage } from "../../ui-elements/profile/AvatarImage"
import { TextLink } from "../../ui-elements/text-link/TextLink"

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile()

  useEffect(() => {
    if (!isLoading && !profile) {
      navigate("/")
      return
    }
  }, [profile, isLoading])

  return (
    <div className="container">
      <h1>My Profile</h1>

      <div
        className={
          "p-4 bg-white border border-1 d-flex flex-row align-items-center justify-content-between"
        }
      >
        <div className={"d-flex align-items-center"}>
          <AvatarImage
            avatarUrl={profile?.avatar_url}
            circle={true}
          ></AvatarImage>
          <div className={"ms-3"}>
            <div className={"h4"}>{profile?.name}</div>
            <div className={"h6"}>{profile?.username}</div>
            <TextLink internal={true} to={`/user/${profile?.username}`}>
              See public profile
            </TextLink>
          </div>
        </div>
        <div>
          <Link className={"btn btn-primary"} to={`edit`}>
            Edit profile
          </Link>
        </div>
      </div>

      <div className={"pt-5"}>
        <h3>You are a Conference Buddy ♥️</h3>
        <div className="card">
          <div className="card-body">
            <BuddyPostsOfUser profileId={profile?.id}></BuddyPostsOfUser>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Head() {
  return <PageHead title={"Your profile"} />
}
