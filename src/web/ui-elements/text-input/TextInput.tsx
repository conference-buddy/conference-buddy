import React, { ReactElement } from "react"
import { v4 as uuidv4 } from "uuid"

type TextInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  placeholder: string
  required?: boolean
  disabled?: boolean
}

function TextInput(props: TextInputProps): ReactElement {
  const { label, onChange, placeholder } = props
  const required = props.required ? props.required : false
  const disabled = props.disabled ? props.disabled : false
  const idForTextInput = uuidv4()

  return (
    <div className="row mb-5">
      <label
        htmlFor={idForTextInput}
        className="form-label col-m-2 col-sm-3 col-form-label col-form-label-lg"
      >
        {label}
      </label>
      <div className="col-m-10 col-sm-9">
        <input
          id={idForTextInput}
          required={required}
          disabled={disabled}
          type="text"
          className="form-control form-control-lg"
          onChange={e => onChange(e)}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export { TextInput }
