import React, { ReactElement } from "react"

import { TextLink } from "../../text-link/TextLink"
import { useAuthUserContext } from "../../../../services/hooks/auth-user/useAuthUserContext"
import useProfile from "../../../../services/hooks/profile/useProfile"

function CreateProfileAlert(): ReactElement {
  const { authUser } = useAuthUserContext()
  const { data, isLoading } = useProfile()

  return (
    <>
      {authUser && !isLoading && !data && (
        <div className="alert alert-danger mb-0" role="alert">
          <div className="container">
            <b>You're successfully authenticated. Thank you!</b> To use
            Conference Buddy with all functionality, please{" "}
            <TextLink to="/profile/create" internal={true}>
              create a profile
            </TextLink>
            . Letting others know a bit more about yourself helps creating a
            more trustful and safer environment for everybody.
          </div>
        </div>
      )}
    </>
  )
}
export { CreateProfileAlert }
