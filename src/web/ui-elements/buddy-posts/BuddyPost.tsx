import React, { ReactElement } from "react"
import { StaticImage } from "gatsby-plugin-image"
import usePublicProfile from "../../../services/hooks/public-profile/usePublicProfile"
import { TextLink } from "../text-link/TextLink"

//eslint-disable-next-line  @typescript-eslint/no-explicit-any
function BuddyPostSingle({ post }: { post: any }): ReactElement {
  const { data: publicProfile, isLoading } = usePublicProfile(post.profile_id)

  return (
    <div className="card mb-3 container">
      <div className="card-body">
        <div className="row">
          <div className="col-1">
            <StaticImage
              src={"../../../assets/images/profilepicplaceholder.png"}
              alt={"Placeholder image"}
              width={100}
              placeholder="blurred"
              className="rounded-circle"
            />
          </div>
          {!isLoading ? (
            <div className="col">
              <div className="d-flex justify-content-between">
                <TextLink
                  to={`/user/${publicProfile?.username}`}
                  internal={true}
                >
                  {publicProfile?.username}
                </TextLink>
                <div className="text-dark text-opacity-75">
                  💬 {post.created_at}
                </div>
              </div>

              <p className="card-text pt-2">{post.text}</p>

              <div className="small text-end">
                <a href="/linknotexistingyet">edit entry</a>
              </div>
            </div>
          ) : (
            <div className="col">
              <div className="d-flex justify-content-between">
                <div className="placeholder-glow">
                  <span className="placeholder">user name loading</span>
                </div>
                <div className="placeholder-glow">
                  💬 <span className="placeholder">some date placeholder</span>
                </div>
              </div>
              <div className="placeholder-glow">
                <span className="placeholder mt-2">
                  This is a placeholder for a text that hopefully will appeare
                  pretty soon
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { BuddyPostSingle }
