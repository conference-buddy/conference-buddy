import { render, screen, cleanup } from "@testing-library/react"
import { TextInput } from "./TextInput"
import userEvent from "@testing-library/user-event"

const mockOnChange = jest.fn()
const testLabel = "Label of the input"
const testPlaceholder = "Label of the placeholder"

const requiredProps = {
  onChange: mockOnChange,
  label: <>{testLabel}</>,
  placeholder: testPlaceholder,
  errorMessage: "error",
}

describe("TextInput", () => {
  describe("renders all necessary elements", () => {
    beforeAll(() => {
      render(<TextInput {...requiredProps} />)
    })

    afterAll(() => {
      cleanup()
      jest.clearAllMocks()
    })

    it("shows an enabled, not required input with type text with a accessible label based on a prop", () => {
      const input = screen.getByRole("textbox", { name: testLabel })

      expect(input).toBeEnabled()
      expect(input).toHaveAttribute("type", "text")
      expect(input).not.toBeRequired()
    })

    it("shows placeholder based on a prop", () => {
      const input = screen.getByRole("textbox", { name: testLabel })

      expect(input).toHaveAttribute("placeholder", testPlaceholder)
    })

    it("takes a function as onChange event", async () => {
      const input = screen.getByRole("textbox", { name: testLabel })

      await userEvent.type(input, "one")

      expect(mockOnChange).toHaveBeenCalledWith("o")
      expect(mockOnChange).toHaveBeenCalledWith("on")
      expect(mockOnChange).toHaveBeenCalledWith("one")
      expect(mockOnChange).toHaveBeenCalledTimes(3)
    })
  })

  describe("renders dependent on props", () => {
    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    describe("disables input", () => {
      it("disables input based on prop", () => {
        render(<TextInput {...requiredProps} disabled={true} />)
        const input = screen.getByRole("textbox", { name: testLabel })

        expect(input).toBeDisabled()
      })

      it("blocks onChange event if input is disabled", async () => {
        render(<TextInput {...requiredProps} disabled={true} />)
        const input = screen.getByRole("textbox", { name: testLabel })

        await userEvent.type(input, "one")

        expect(mockOnChange).not.toHaveBeenCalled()
      })
    })

    describe("changes the type of input based on prop", () => {
      it("shows a input for an url", () => {
        render(<TextInput {...requiredProps} type="url" />)
        const input = screen.getByRole("textbox", { name: testLabel })

        expect(input).toHaveAttribute("type", "url")
      })

      it("shows a input for a date", () => {
        render(<TextInput {...requiredProps} type="date" />)
        // type="date" does not translate to an accessible element
        // in testing library
        const input = screen.getByLabelText(testLabel)

        expect(input).toHaveAttribute("type", "date")
      })
    })

    describe("takes a list of data as datalist", () => {
      const testDataList = [
        "first suggestion",
        "second suggestion",
        "third suggestion",
      ]

      it("shows a input with a datalist", () => {
        render(<TextInput {...requiredProps} list={testDataList} />)

        const input = screen.getByRole("combobox", { name: testLabel })

        expect(input).toBeEnabled()
      })

      testDataList.forEach(entry => {
        it(`shows the entry ${entry} as an option`, () => {
          render(<TextInput {...requiredProps} list={testDataList} />)

          const input = screen.getByRole("combobox", { name: testLabel })
          const option = screen.getByRole("option", {
            name: entry,
            hidden: true,
          })

          expect(input).toBeEnabled()
          expect(option).toBeInTheDocument()
        })
      })
    })

    it("takes a onBlur function as prop", async () => {
      const mockOnBlur = jest.fn()
      render(<TextInput {...requiredProps} onBlur={mockOnBlur} />)

      const input = screen.getByRole("textbox", { name: testLabel })
      await userEvent.type(input, "one")
      await userEvent.tab()

      expect(mockOnBlur).toHaveBeenCalled()
    })
  })

  it("makes an input required based on a prop", () => {
    render(<TextInput {...requiredProps} required={true} />)
    const input = screen.getByRole("textbox", { name: testLabel })

    expect(input).toBeEnabled()
    expect(input).toBeRequired()
  })
})
