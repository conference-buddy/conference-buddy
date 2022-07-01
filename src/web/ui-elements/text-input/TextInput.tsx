import React, { ReactElement } from "react"
import { v4 as uuidv4 } from "uuid"

type TextInputTypes = "text" | "url" | "date"

type TextInputProps = {
  onChange: (value: string) => void
  onBlur?: (value: string) => void
  label: string
  placeholder: string
  required?: boolean
  disabled?: boolean
  type?: TextInputTypes
}

function TextInput(props: TextInputProps): ReactElement {
  const { label, onChange, onBlur, placeholder } = props
  const required = props.required ? props.required : false
  const disabled = props.disabled ? props.disabled : false
  const type = props.type ? props.type : "text"
  const idForTextInput = uuidv4()

  return (
    <div className="mb-5">
      <label
        htmlFor={idForTextInput}
        className="form-label col-form-label col-form-label-lg mb-0"
      >
        {label}
      </label>
      <input
        id={idForTextInput}
        required={required}
        disabled={disabled}
        type={type}
        className="form-control form-control-lg"
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur ? e => onBlur(e.target.value) : undefined}
        placeholder={placeholder}
      />
    </div>
  )
}

export { TextInput }
