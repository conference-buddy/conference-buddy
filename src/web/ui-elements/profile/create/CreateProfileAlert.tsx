import React, { ReactElement } from "react"
import { TextLink } from "../../text-link/TextLink"
import useProfile from "../../../../services/hooks/profile/useProfile"
import { useAuthUserContext } from "../../../../services/hooks/auth-user/useAuthUserContext"

function CreateProfileAlert(): ReactElement {
  const { authUser, isLoading: isAuthUserLoading } = useAuthUserContext()
  const { data: profile, isLoading: profileIsLoading } = useProfile()

  return (
    <>
      {!isAuthUserLoading && authUser && !profileIsLoading && !profile && (
        <div>
          <div className="alert alert-danger mb-0" role="alert">
            <div className="container">
              <b>You're successfully authenticated. Thank you!</b> To use
              Conference Buddy with all functionality, please{" "}
              <TextLink to="/profile/create" internal={true}>
                create a profile
              </TextLink>
              . Letting others know a bit more about yourself helps creating a
              trustful and safe environment for everybody.
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export { CreateProfileAlert }
