import React, { ReactElement, ReactNode } from "react"
import { Link } from "gatsby"

type TextLinkProps = {
  internal: boolean
  to: string
  children: ReactNode
  light?: boolean
  additionalClasses?: string
} & typeof defaultProps

const defaultProps = {
  light: false,
  internal: false,
}

function TextLink(props: TextLinkProps): ReactElement {
  const linkClass = props.light ? "TextLink-light" : "TextLink-primary"

  return (
    <>
      {!props.internal ? (
        <a
          href={props.to}
          className={`TextLink ${linkClass} ${props.additionalClasses}`}
        >
          {props.children}
        </a>
      ) : (
        <Link
          to={props.to}
          className={`TextLink ${linkClass} ${props.additionalClasses}`}
        >
          {props.children}
        </Link>
      )}
    </>
  )
}

TextLink.defaultProps = defaultProps

export { TextLink }
