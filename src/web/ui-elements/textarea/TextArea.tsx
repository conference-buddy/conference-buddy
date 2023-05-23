import React, { ReactElement } from "react"
import { v4 as uuidv4 } from "uuid"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type TextAreaProps<T extends FieldValues> = {
  additionalClasses?: string
  disabled?: boolean
  error?: string
  label: string
  labelSROnly?: boolean
  name: Path<T>
  placeholder: string
  register: UseFormRegister<T>
  required?: boolean
  rows?: number
  validated?: boolean
}

function TextArea<T extends FieldValues>({
  additionalClasses,
  disabled,
  error,
  label,
  labelSROnly,
  name,
  placeholder,
  register,
  required,
  rows,
  validated,
}: TextAreaProps<T>): ReactElement {
  const idForTextAreaInput = uuidv4()
  const invalidClass = error ? `is-invalid` : ""
  const validClass = validated && !error ? "is-valid" : ""

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
        {...register(name)}
        id={idForTextAreaInput}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        disabled={disabled}
        rows={rows || 5}
        className={`form-control ${invalidClass} ${validClass} `}
        placeholder={placeholder}
      />
      <div className="valid-feedback">Looks good!</div>
      <div className={"invalid-feedback"}>{error}</div>
    </div>
  )
}

export { TextArea }
