import React, { ReactElement } from "react"
import { v4 as uuidv4 } from "uuid"

type TextAreaInputProps = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  label: string
  placeholder: string
  required?: boolean
  disabled?: boolean
}

function TextAreaInput(props: TextAreaInputProps): ReactElement {
  const { label, onChange, placeholder } = props
  const required = props.required ? props.required : false
  const disabled = props.disabled ? props.disabled : false
  const idForTextAreaInput = uuidv4()

  return (
    <div className="mb-5">
      <label
        htmlFor={idForTextAreaInput}
        className="form-label col-form-label col-form-label-lg mb-0"
      >
        {label}
      </label>
      <textarea
        id={idForTextAreaInput}
        required={required}
        disabled={disabled}
        rows={5}
        className="form-control form-control-lg"
        onChange={e => onChange(e)}
        placeholder={placeholder}
      />
    </div>
  )
}

export { TextAreaInput }
