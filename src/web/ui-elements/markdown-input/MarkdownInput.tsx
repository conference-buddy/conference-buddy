import React, { Dispatch, ReactElement, SetStateAction } from "react"
import MDEditor, { ICommand } from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"
import { v4 as uuidv4 } from "uuid"
import { IconFilePencil } from "@tabler/icons-react"

type MarkDownInputProps = {
  onChange: Dispatch<SetStateAction<string | undefined>>
  value: string | undefined
  label: string
  placeholder: string
  onBlur?: (value: string) => void
  required?: boolean
  disabled?: boolean
  validated: boolean
  error: string
}

function MarkdownInput(props: MarkDownInputProps): ReactElement {
  const {
    value,
    label,
    onChange,
    placeholder,
    required,
    disabled,
    validated,
    error,
  } = props
  const idForMarkdownInput = uuidv4()

  function removeCommands(cmd: ICommand): false | ICommand {
    return cmd && cmd.name && /comment|divider|code|codeBlock/.test(cmd.name)
      ? false
      : cmd
  }

  const defaultClass = !validated ? "p-0 m-1 border-0" : ""
  const invalidClass = error ? `is-invalid` : ""
  const validClass = validated && !error ? "is-valid p-1 border-2" : ""

  return (
    <div data-color-mode="light">
      <div className="wmde-markdown-var"> </div>

      <label
        htmlFor={idForMarkdownInput}
        className="form-label col-form-label col-form-label-lg mb-0 d-block"
      >
        <IconFilePencil />
        {label} <span className={"visually-hidden"}>, markdown editor</span>
      </label>
      <div
        className={`form-control ${defaultClass} ${invalidClass} ${validClass}`}
      >
        <MDEditor
          id={idForMarkdownInput}
          value={value}
          aria-label={label}
          placeholder={placeholder}
          aria-required={required}
          aria-disabled={disabled}
          onChange={e => onChange(e)}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          draggable={false}
          preview="edit"
          commandsFilter={cmd => removeCommands(cmd)}
        />
      </div>
      <div className="valid-feedback">Looks good!</div>
      <div className={"invalid-feedback"}>{error}</div>
    </div>
  )
}

export { MarkdownInput }
