import React, { useEffect } from "react"
import { CreateProfile } from "../../../ui-elements/profile/create/CreateProfile"
import { PageLayout } from "../../../ui-elements/page-layout/PageLayout"
import useProfile from "../../../services/hooks/profile/useProfile"
// import { navigate } from "gatsby"

export default function CreateProfilePage() {
  const { data: profile, isLoading } = useProfile()

  useEffect(() => {
    if (profile && !isLoading) {
      // navigate("/profile")
    }
  }, [profile, isLoading])

  return (
    <PageLayout title="Profile">
      <div className="container">
        <h2>Create new Profile</h2>
        {/*{!profile && !isLoading && <CreateProfile />}*/}
        <CreateProfile />
      </div>
    </PageLayout>
  )
}
