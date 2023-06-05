const MDEditor = (props: any) => {
// this is a very rough way to mock the
// editor while still being able to test
// that the most important props are
// passed
 return <textarea
     data-testid={"markdown-editor-stub"}
     id={props.id}
     onChange={(event) => props.onChange(event.target.value)}
     onBlur={(event) => props.onBlur(event)}
     aria-label={props['aria-label']}
     {...props.textareaProps}
 />;
}

export const ICommand = {}; // Empty object or desired mock implementation

export default MDEditor