import { generateEmptyProfile } from "./generate-empty-profile"
import { Profile } from "../types/types-profiles"

const emptyProfile: Profile = {
  created_at: "",
  email: "",
  id: "",
  name: "",
  provider: "",
  social_links: [],
  updated_at: "",
  username: "",
}

describe("'generateEmptyProfile' generates an empty Profile", () => {
  it("transforms the social links to be used in profile", () => {
    const result = generateEmptyProfile()

    expect(result).toEqual(emptyProfile)
  })
})
