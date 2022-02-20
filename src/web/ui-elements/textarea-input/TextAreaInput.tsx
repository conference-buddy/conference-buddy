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
    <div className="row mb-5">
      <label
        htmlFor={idForTextAreaInput}
        className="form-label col-m-2 col-sm-3 col-form-label col-form-label-lg"
      >
        {label}
      </label>
      <div className="col-m-10 col-sm-9">
        <textarea
          id={idForTextAreaInput}
          required={required}
          disabled={disabled}
          rows={10}
          className="form-control form-control-lg"
          onChange={e => onChange(e)}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export { TextAreaInput }
