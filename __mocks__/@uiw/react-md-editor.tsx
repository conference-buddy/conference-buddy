const MDEditor = (props: any) => {
// this is a very rough way to mock the
// editor while still being able to test
// that the most important props are
// passed
 return <textarea
     data-testid={"markdown-editor-stub"}
     id={props.id}
     value={props.value}
     placeholder={props.placeholder}
     onChange={props.onChange}
     aria-label={props['aria-label']}
     aria-invalid={props['aria-invalid']}
     {...props.textareaProps}
 />;
}

export const ICommand = {}; // Empty object or desired mock implementation

export default MDEditor