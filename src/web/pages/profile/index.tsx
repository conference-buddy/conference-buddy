import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"
import useProfile from "../../../services/hooks/profile/useProfile"
import { PageHead } from "../../ui-elements/page-layout/PageHead"

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
      <h2>My Profile</h2>
      {profile && !isLoading && <div>USER PAGE {profile.name}</div>}
      <Link to={`/user/${profile?.username}`}>public profile</Link>
    </div>
  )
}

export function Head() {
  return <PageHead title={"Your profile"} />
}
