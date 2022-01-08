import { useContext } from "react"
import { AuthUserContext } from "../../context-provider/AuthUserProvider"

export default function useAuthUserContext() {
  return useContext(AuthUserContext)
}
