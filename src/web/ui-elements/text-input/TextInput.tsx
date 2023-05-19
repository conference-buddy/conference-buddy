import React, { ReactElement } from "react"
import { v4 as uuidv4 } from "uuid"

type TextInputTypes = "text" | "url" | "date" | "email"

type TextInputProps = {
  onChange: (value: string) => void
  value?: string
  label: ReactElement
  placeholder: string
  onBlur?: (value: string) => void
  required?: boolean
  disabled?: boolean
  type?: TextInputTypes
  list?: string[]
  ariaDescription?: string
}

function TextInput(props: TextInputProps): ReactElement {
  const { label, onChange, onBlur, ariaDescription, placeholder, value } = props
  const required = props.required ? props.required : false
  const disabled = props.disabled ? props.disabled : false
  const type = props.type ? props.type : "text"
  const idForTextInput = uuidv4()
  const idForDescription = uuidv4()
  const idForDataList = uuidv4()

  return (
    <div className="mb-5">
      <label
        htmlFor={idForTextInput}
        className="form-label ms-2 col-form-label col-form-label-lg mb-0"
      >
        {label}
      </label>
      {ariaDescription && (
        <div id={idForDescription} className={"visually-hidden"}>
          Please enter a valid url.
        </div>
      )}
      <input
        value={value}
        list={props.list && idForDataList}
        id={idForTextInput}
        aria-describedby={ariaDescription && idForDescription}
        required={required}
        disabled={disabled}
        type={type}
        className="form-control form-control-lg"
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur ? e => onBlur(e.target.value) : undefined}
        placeholder={placeholder}
      />
      {props.list?.length && (
        <datalist id={idForDataList}>
          {props.list.map((entry, index) => {
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

export { TextInput }
