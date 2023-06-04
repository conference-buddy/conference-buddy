import React, { ReactElement } from "react"
import { v4 as uuidv4 } from "uuid"

type TextInputTypes = "text" | "url" | "date" | "email"

type TextInputProps = {
  label: ReactElement
  placeholder: string
  errorText: string
  validated: boolean
  hasError: boolean
  ariaDescription?: string
  required?: boolean
  disabled?: boolean
  type?: TextInputTypes
  list?: string[]
} & typeof defaultProps

const defaultProps = {
  required: false,
  disabled: false,
  type: "text",
}

// Note: to enable correct validation styling,
// the class has-validation needs to be added
// to the FORM element this input is part of
// see: https://getbootstrap.com/docs/5.3/forms/validation/
function TextInput(props: TextInputProps): ReactElement {
  const {
    ariaDescription,
    disabled,
    hasError,
    errorText,
    label,
    list,
    placeholder,
    required,
    type,
    validated,
  } = props
  const idForTextInput = uuidv4()
  const idForDescription = uuidv4()
  const idForDataList = uuidv4()

  const invalidClass = hasError ? `is-invalid` : ""
  const validClass = validated && !hasError ? "is-valid" : ""
  return (
    <div className="mb-3">
      <label
        htmlFor={idForTextInput}
        className="form-label col-form-label mb-0"
      >
        {label}
      </label>
      {ariaDescription && (
        <div id={idForDescription} className={"visually-hidden"}>
          {ariaDescription}
        </div>
      )}
      <input
        list={list && idForDataList}
        id={idForTextInput}
        aria-describedby={ariaDescription && idForDescription}
        aria-required={required}
        aria-invalid={hasError}
        disabled={disabled}
        type={type || "text"}
        className={`form-control  ${invalidClass} ${validClass}`}
        placeholder={placeholder}
      />

      <div style={{ height: "16px" }} className="valid-feedback">
        Looks good!
      </div>
      <div style={{ height: "16px" }} className={"invalid-feedback"}>
        {errorText}
      </div>

      {list?.length && list?.length >= 0 && (
        <datalist id={idForDataList}>
          {list.map((entry, index) => {
            return (
              <option value={entry} key={index}>
                {entry}
              </option>
            )
          })}
        </datalist>
      )}
    </div>
  )
}

TextInput.defaultProps = defaultProps
export { TextInput }
