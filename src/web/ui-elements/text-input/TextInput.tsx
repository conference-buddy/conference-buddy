import React, { ReactElement } from "react"
import { v4 as uuidv4 } from "uuid"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type TextInputTypes = "text" | "url" | "date" | "email"

type TextInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  name: Path<T>
  label: ReactElement
  placeholder: string
  error: string
  required?: boolean
  disabled?: boolean
  type?: TextInputTypes
  list?: string[]
  ariaDescription?: string
  validated: boolean
}

function TextInput<T extends FieldValues>(
  props: TextInputProps<T>
): ReactElement {
  const {
    ariaDescription,
    disabled,
    error,
    label,
    list,
    placeholder,
    register,
    required,
    type,
    name,

    validated,
  } = props
  const idForTextInput = uuidv4()
  const idForDescription = uuidv4()
  const idForDataList = uuidv4()

  const invalidClass = error ? `is-invalid` : ""
  const validClass = validated && !error ? "is-valid" : ""
  return (
    <div className="mb-5">
      <label
        htmlFor={idForTextInput}
        className="form-label ms-2 col-form-label mb-0"
      >
        {label}
      </label>
      {ariaDescription && (
        <div id={idForDescription} className={"visually-hidden"}>
          {ariaDescription}
        </div>
      )}
      <input
        {...register(name)}
        list={list && idForDataList}
        id={idForTextInput}
        aria-describedby={ariaDescription && idForDescription}
        aria-required={required}
        aria-invalid={Boolean(error)}
        disabled={disabled}
        type={type || "text"}
        className={`form-control  ${invalidClass} ${validClass}`}
        placeholder={placeholder}
      />

      <div className="valid-feedback">Looks good!</div>
      <div className={"invalid-feedback"}>{error}</div>

      {list?.length && (
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

export { TextInput }
