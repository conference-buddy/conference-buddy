import { useContext } from "react"
import { AuthUserContext } from "../../context-provider/AuthUserProvider"

function useAuthUserContext() {
  return useContext(AuthUserContext)
}

export { useAuthUserContext }
