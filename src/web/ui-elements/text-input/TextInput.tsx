import React, { ReactElement } from "react"
import { v4 as uuidv4 } from "uuid"

type TextInputTypes = "text" | "url" | "date" | "email"

type TextInputProps = {
  onChange: (value: string) => void
  value?: string
  label: ReactElement
  placeholder: string
  errorMessage: string
  onBlur?: (value: string) => void
  required?: boolean
  disabled?: boolean
  type?: TextInputTypes
  list?: string[]
  ariaDescription?: string
}

function TextInput(props: TextInputProps): ReactElement {
  const {
    label,
    onChange,
    onBlur,
    ariaDescription,
    placeholder,
    value,
    errorMessage,
  } = props
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
          {ariaDescription}
        </div>
      )}
      <input
        value={value}
        list={props.list && idForDataList}
        id={idForTextInput}
        aria-describedby={ariaDescription && idForDescription}
        required={required || Boolean(value && value?.length > 0)}
        disabled={disabled}
        type={type}
        className={`form-control form-control-lg`}
        style={
          !required && Boolean(value?.length === 0)
            ? { borderColor: "#ced4da", backgroundImage: "none" }
            : {}
        }
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur ? e => onBlur(e.target.value) : undefined}
        placeholder={placeholder}
      />

      {required ||
        (Boolean(value && value?.length > 0) && (
          <>
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">{errorMessage}</div>
          </>
        ))}
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
