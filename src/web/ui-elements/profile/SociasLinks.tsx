import React, { ReactElement } from "react"
import { SocialLink } from "../../../domain/_social-links/types/types-social-links"

function SocialLinks({
  socialLinks,
}: {
  socialLinks: SocialLink[] | undefined
}): ReactElement {
  return (
    <>
      <ul className="list-group list-group-flush">
        {socialLinks?.map((socialLink: SocialLink, index: number) => {
          if (!socialLink.address) return

          switch (socialLink.platform) {
            case "github":
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  key={index}
                >
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="me-2"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    {socialLink.platformName}
                  </h6>
                  <span className="text-secondary">{socialLink.address}</span>
                </li>
              )
            case "gitlab":
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  key={index}
                >
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="me-2"
                    >
                      {" "}
                      <g>
                        {" "}
                        <path fill="none" d="M0 0h24v24H0z" />{" "}
                        <path
                          fillRule="nonzero"
                          fill="#fc6d26"
                          d="M5.68 7.314l-1.82 5.914L12 19.442l8.14-6.214-1.82-5.914L16.643 11H7.356L5.681 7.314zM15.357 9l2.888-6.354a.4.4 0 0 1 .747.048l3.367 10.945a.5.5 0 0 1-.174.544L12 21.958 1.816 14.183a.5.5 0 0 1-.174-.544L5.009 2.694a.4.4 0 0 1 .747-.048L8.644 9h6.712z"
                        />{" "}
                      </g>{" "}
                    </svg>
                    {socialLink.platformName}
                  </h6>
                  <span className="text-secondary">{socialLink.address}</span>
                </li>
              )
            case "mastodon":
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  key={index}
                >
                  <h6 className="mb-0">
                    <svg
                      className="me-2"
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {" "}
                      <g>
                        {" "}
                        <path fill="none" d="M0 0h24v24H0z" />{" "}
                        <path
                          fillRule="nonzero"
                          fill="#595aff"
                          d="M3.018 12.008c-.032-1.26-.012-2.448-.012-3.442 0-4.338 2.843-5.61 2.843-5.61 1.433-.658 3.892-.935 6.45-.956h.062c2.557.02 5.018.298 6.451.956 0 0 2.843 1.272 2.843 5.61 0 0 .036 3.201-.396 5.424-.275 1.41-2.457 2.955-4.963 3.254-1.306.156-2.593.3-3.965.236-2.243-.103-4.014-.535-4.014-.535 0 .218.014.426.04.62.084.633.299 1.095.605 1.435.766.85 2.106.93 3.395.974 1.82.063 3.44-.449 3.44-.449l.076 1.646s-1.274.684-3.542.81c-1.25.068-2.803-.032-4.612-.51-1.532-.406-2.568-1.29-3.27-2.471-1.093-1.843-1.368-4.406-1.431-6.992zm3.3 4.937v-2.548l2.474.605a20.54 20.54 0 0 0 1.303.245c.753.116 1.538.2 2.328.235 1.019.047 1.901-.017 3.636-.224 1.663-.199 3.148-1.196 3.236-1.65.082-.422.151-.922.206-1.482a33.6 33.6 0 0 0 .137-2.245c.015-.51.02-.945.017-1.256v-.059c0-1.43-.369-2.438-.963-3.158a3.008 3.008 0 0 0-.584-.548c-.09-.064-.135-.089-.13-.087-1.013-.465-3.093-.752-5.617-.773h-.046c-2.54.02-4.62.308-5.65.782.023-.01-.021.014-.112.078a3.008 3.008 0 0 0-.584.548c-.594.72-.963 1.729-.963 3.158 0 .232 0 .397-.003.875a77.483 77.483 0 0 0 .014 2.518c.054 2.197.264 3.835.7 5.041.212.587.472 1.07.78 1.45a5.7 5.7 0 0 1-.18-1.505zM8.084 6.37a1.143 1.143 0 1 1 0 2.287 1.143 1.143 0 0 1 0-2.287z"
                        />{" "}
                      </g>{" "}
                    </svg>
                    {socialLink.platformName}
                  </h6>
                  <span className="text-secondary">{socialLink.address}</span>
                </li>
              )
            case "twitter":
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  key={index}
                >
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1DA1F2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="me-2"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    {socialLink.platformName}
                  </h6>
                  <span className="text-secondary">{socialLink.address}</span>
                </li>
              )
            case "website":
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  key={index}
                >
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="me-2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    {socialLink.platformName}
                  </h6>
                  <a
                    href={socialLink.address}
                    className="text-secondary"
                    target="_blank"
                  >
                    {socialLink.address}
                  </a>
                </li>
              )
            case "linkedin":
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                  key={index}
                >
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="me-2 text-primary"
                    >
                      {" "}
                      <g>
                        {" "}
                        <path fill="none" d="M0 0h24v24H0z" />{" "}
                        <path
                          fill="#0A66C2"
                          d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm2.5 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-1 1h2v7.5h-2V10zm5.5.43c.584-.565 1.266-.93 2-.93 2.071 0 3.5 1.679 3.5 3.75v4.25h-2v-4.25a1.75 1.75 0 0 0-3.5 0v4.25h-2V10h2v.43z"
                        />{" "}
                      </g>{" "}
                    </svg>
                    {socialLink.platformName}
                  </h6>
                  <span className="text-secondary">{socialLink.address}</span>
                </li>
              )
            default:
              break
          }
        })}
      </ul>
    </>
  )
}

export default SocialLinks
