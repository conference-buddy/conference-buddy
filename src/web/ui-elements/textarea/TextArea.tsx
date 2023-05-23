import React, { ReactElement } from "react"
import { v4 as uuidv4 } from "uuid"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type TextAreaProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  name: Path<T>
  label: string
  placeholder: string
  error?: string
  validated?: boolean
  labelSROnly?: boolean
  required?: boolean
  disabled?: boolean
}

function TextArea<T extends FieldValues>({
  label,
  register,
  name,
  placeholder,
  labelSROnly,
  required,
  disabled,
  error,
  validated,
}: TextAreaProps<T>): ReactElement {
  const idForTextAreaInput = uuidv4()
  const invalidClass = error ? `is-invalid` : ""
  const validClass = validated && !error ? "is-valid" : ""

  return (
    <div className={"mb-3"}>
      <label
        htmlFor={idForTextAreaInput}
        className="form-label col-form-label mb-0"
      >
        <span className={labelSROnly ? "visually-hidden" : ""}>{label}</span>
      </label>
      <textarea
        {...register(name)}
        id={idForTextAreaInput}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        disabled={disabled}
        rows={5}
        className={`form-control ${invalidClass} ${validClass}`}
        placeholder={placeholder}
      />
      <div className="valid-feedback">Looks good!</div>
      <div className={"invalid-feedback"}>{error}</div>
    </div>
  )
}

export { TextArea }
