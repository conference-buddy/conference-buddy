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
  const linkStyle = props.light ? "TextLink-light" : "TextLink-primary"
  const linkClasses = `TextLink ${linkStyle} ${
    props.additionalClasses ? props.additionalClasses : ""
  }`

  return (
    <span>
      {!props.internal ? (
        <a href={props.to} className={linkClasses}>
          {props.children}
        </a>
      ) : (
        <Link to={props.to} className={linkClasses} data-testid={"gatsby-link"}>
          {props.children}
        </Link>
      )}
    </span>
  )
}

TextLink.defaultProps = defaultProps

export { TextLink }
