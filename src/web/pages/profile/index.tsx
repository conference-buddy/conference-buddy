import React from "react"
import { Link, navigate } from "gatsby"
import useProfile from "../../../services/hooks/profile/useProfile"
import { PageHead } from "../../ui-elements/page-layout/PageHead"
import { BuddyPostsOfUser } from "../../ui-elements/buddy-posts/BuddyPostsOfUser"
import { AvatarImage } from "../../ui-elements/profile/AvatarImage"
import { TextLink } from "../../ui-elements/text-link/TextLink"
import { Profile } from "../../../domain/profiles"
import { StaticImage } from "gatsby-plugin-image"

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile()

  if (isLoading) {
    return (
      <div className="container text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!profile && !isLoading) {
    navigate("/")
    return <></>
  }
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
            avatarUrl={(profile as Profile).avatar_url}
            circle={true}
          ></AvatarImage>
          <div className={"ms-3"}>
            <div className={"h4"}>{(profile as Profile).name}</div>
            <div className={"h6"}>{(profile as Profile).username}</div>
            <TextLink
              internal={true}
              to={`/user/${(profile as Profile).username}`}
            >
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
        <h3>
          <StaticImage
            aria-hidden={true}
            src="../../assets/images/icon.png"
            alt={"Conference buddy logo"}
            width={40}
            className="me-2"
          />
          You are a Conference Buddy
        </h3>
        <div className="card">
          <div className="card-body">
            <BuddyPostsOfUser
              profileId={(profile as Profile).id}
            ></BuddyPostsOfUser>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Head() {
  return <PageHead title={"Your profile"} />
}
