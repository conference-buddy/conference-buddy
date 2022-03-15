import React, { ReactElement } from "react"
import MDEditor, { ICommand } from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"
import { v4 as uuidv4 } from "uuid"

type MarkDownInputProps = {
  onChangeInput: (value: string | undefined) => void
  onBlur?: (value: string) => void
  value: string
  label: string
  placeholder: string
  required?: boolean
  disabled?: boolean
}

function MarkdownInput(props: MarkDownInputProps): ReactElement {
  const { value, label, onChangeInput, placeholder } = props
  const required = props.required ? props.required : false
  const disabled = props.disabled ? props.disabled : false
  const idForTextInput = uuidv4()

  function removeCommands(cmd: ICommand): false | ICommand {
    return cmd && cmd.name && /comment|divider|code|codeBlock/.test(cmd.name)
      ? false
      : cmd
  }

  return (
    <>
      <label
        htmlFor={idForTextInput}
        className="form-label col-form-label col-form-label-lg mb-0 d-block"
      >
        {label}
        <MDEditor
          id={idForTextInput}
          value={value}
          aria-label={label}
          placeholder={placeholder}
          aria-required={required}
          aria-disabled={disabled}
          onChange={e => onChangeInput(e)}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          visiableDragbar={false}
          preview="edit"
          commandsFilter={cmd => removeCommands(cmd)}
        />
      </label>
    </>
  )
}

export { MarkdownInput }
