import React, { ReactElement } from "react"
import MDEditor, { ICommand } from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"

type MarkDownInputProps = {
  text: string
}

function MarkdownInput(props: MarkDownInputProps): ReactElement {
  const { text } = props
  const [value, setValue] = React.useState(text)

  function updateValue(value: string | undefined) {
    if (value) {
      setValue(value)
    }
  }
  function removeCommands(cmd: ICommand): false | ICommand {
    return cmd && cmd.name && /comment|divider|code|codeBlock/.test(cmd.name)
      ? false
      : cmd
  }

  return (
    <>
      <div className="container">
        <MDEditor
          value={value}
          onChange={updateValue}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          visiableDragbar={false}
          preview="edit"
          commandsFilter={cmd => removeCommands(cmd)}
        />
      </div>
    </>
  )
}

export { MarkdownInput }
