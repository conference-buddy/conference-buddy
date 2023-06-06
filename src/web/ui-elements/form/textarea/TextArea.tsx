import React, { forwardRef, ReactElement } from "react"
import { v4 as uuidv4 } from "uuid"

type TextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label: ReactElement
  placeholder: string
  errorText: string
  validated: boolean
  hasError: boolean
  required?: boolean
  rows?: number
  labelSROnly?: boolean
  disabled?: boolean
  additionalClasses?: string
}
// Note: to enable correct validation styling,
// the class has-validation needs to be added
// to the FORM element this input is part of
// see: https://getbootstrap.com/docs/5.3/forms/validation/
const TextArea = forwardRef(function TextArea(
  props: TextAreaProps,
  ref
): ReactElement {
  const {
    additionalClasses,
    validated,
    errorText,
    hasError,
    label,
    placeholder,
    labelSROnly = false,
    required = false,
    rows = 5,
    disabled = false,
  } = props
  const idForTextAreaInput = uuidv4()
  const invalidClass = hasError ? `is-invalid` : ""
  const validClass = validated && !hasError ? "is-valid" : ""

  return (
    <div className={`${additionalClasses ? additionalClasses : "mb-3"}`}>
      <label
        htmlFor={idForTextAreaInput}
        className={
          labelSROnly ? "visually-hidden" : "form-label col-form-label mb-0"
        }
      >
        <span className={labelSROnly ? "visually-hidden" : ""}>{label}</span>
      </label>
      <textarea
        {...ref}
        id={idForTextAreaInput}
        required={required}
        aria-required={required}
        aria-invalid={hasError}
        disabled={disabled}
        rows={rows}
        className={`form-control ${invalidClass} ${validClass} `}
        placeholder={placeholder}
      />
      <div className="valid-feedback">Looks good!</div>
      <div className={"invalid-feedback"}>{errorText}</div>
    </div>
  )
})

export { TextArea }
export type { TextAreaProps }
