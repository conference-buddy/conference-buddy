import React, { ReactElement, ReactNode } from "react"

type TextButtonProps = {
  handleClick: () => void
  children: ReactNode
  light?: boolean
} & typeof defaultProps

const defaultProps = {
  light: false,
}

function TextButton(props: TextButtonProps): ReactElement {
  const linkClass = props.light ? "TextButton-light" : "TextButton-primary"

  return (
    <button
      type="button"
      onClick={props.handleClick}
      className={`TextButton ${linkClass}`}
    >
      {props.children}
    </button>
  )
}

TextButton.defaultProps = defaultProps

export { TextButton }
