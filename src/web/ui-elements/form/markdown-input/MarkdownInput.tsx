import React, { Dispatch, ReactElement, SetStateAction } from "react"
import MDEditor, { ICommand } from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"
import { v4 as uuidv4 } from "uuid"
import { IconFilePencil } from "@tabler/icons-react"

type MarkDownInputProps = {
  onChange: Dispatch<SetStateAction<string | undefined>>
  label: string
  placeholder: string
  validated: boolean
  errorText: string
  hasError: boolean
  required?: boolean
  disabled?: boolean
  value?: string
}

const defaultProps = {
  required: false,
  disabled: false,
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
    hasError,
    errorText,
  } = props
  const idForMarkdownInput = uuidv4()

  function removeCommands(cmd: ICommand): false | ICommand {
    return cmd && cmd.name && /comment|divider|code|codeBlock/.test(cmd.name)
      ? false
      : cmd
  }

  const defaultClass = !validated ? "p-0 m-1 border-0" : ""
  const invalidClass = hasError ? `is-invalid` : ""
  const validClass = validated && !hasError ? "is-valid p-1 border-2" : ""

  return (
    <div data-color-mode="light">
      <div className="wmde-markdown-var"> </div>

      <label
        htmlFor={idForMarkdownInput}
        className="form-label col-form-label col-form-label-lg mb-0 d-block"
      >
        <IconFilePencil aria-hidden={true} />
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
          aria-invalid={hasError}
          onChange={e => onChange(e)}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          draggable={false}
          preview="edit"
          hideToolbar={!!disabled}
          commandsFilter={cmd => removeCommands(cmd)}
          textareaProps={{
            disabled: disabled,
            required: required,
          }}
        />
      </div>
      <div className="valid-feedback">Looks good!</div>
      <div className={"invalid-feedback"}>{errorText}</div>
    </div>
  )
}

MarkdownInput.defaultProps = defaultProps
export { MarkdownInput }
export type { MarkDownInputProps }
