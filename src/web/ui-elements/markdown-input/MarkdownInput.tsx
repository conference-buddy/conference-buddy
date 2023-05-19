import React, { Dispatch, ReactElement, SetStateAction } from "react"
import MDEditor, { ICommand } from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"
import { v4 as uuidv4 } from "uuid"

type MarkDownInputProps = {
  onChange: Dispatch<SetStateAction<string | undefined>>
  value: string | undefined
  label: string
  placeholder: string
  onBlur?: (value: string) => void
  required?: boolean
  disabled?: boolean
}

function MarkdownInput(props: MarkDownInputProps): ReactElement {
  const { value, label, onChange, placeholder } = props
  const required = props.required ? props.required : false
  const disabled = props.disabled ? props.disabled : false
  const idForMarkdownInput = uuidv4()

  function removeCommands(cmd: ICommand): false | ICommand {
    return cmd && cmd.name && /comment|divider|code|codeBlock/.test(cmd.name)
      ? false
      : cmd
  }

  return (
    <div data-color-mode="light">
      <div className="wmde-markdown-var"> </div>

      <label
        htmlFor={idForMarkdownInput}
        className="form-label ms-2 col-form-label col-form-label-lg mb-0 d-block"
      >
        📝 {label} <span className={"visually-hidden"}>, markdown editor</span>
      </label>
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
        className={"pb-3"}
      />
    </div>
  )
}

export { MarkdownInput }
