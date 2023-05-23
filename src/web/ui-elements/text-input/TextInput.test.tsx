import { render, screen, cleanup } from "@testing-library/react"
import { TextInput } from "./TextInput"
import React from "react"

const testLabel = "Label of the input"
const testPlaceholder = "Label of the placeholder"

const requiredProps = {
  label: <>{testLabel}</>,
  placeholder: testPlaceholder,
  error: "error",
  validated: false,
  name: "testname",
}

const mockRegister = jest.fn()

describe("TextInput", () => {
  describe("renders all necessary elements", () => {
    beforeAll(() => {
      render(<TextInput register={mockRegister} {...requiredProps} />)
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
  })

  describe("renders dependent on props", () => {
    afterEach(() => {
      cleanup()
      jest.clearAllMocks()
    })

    describe("disables input", () => {
      it("disables input based on prop", () => {
        render(
          <TextInput
            register={mockRegister}
            {...requiredProps}
            disabled={true}
          />
        )
        const input = screen.getByRole("textbox", { name: testLabel })

        expect(input).toBeDisabled()
      })
    })

    describe("changes the type of input based on prop", () => {
      it("shows a input for an url", () => {
        render(
          <TextInput register={mockRegister} {...requiredProps} type={"url"} />
        )
        const input = screen.getByRole("textbox", { name: testLabel })

        expect(input).toHaveAttribute("type", "url")
      })

      it("shows a input for a date", () => {
        render(
          <TextInput register={mockRegister} {...requiredProps} type="date" />
        )
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
        render(
          <TextInput
            register={mockRegister}
            {...requiredProps}
            list={testDataList}
          />
        )

        const input = screen.getByRole("combobox", { name: testLabel })

        expect(input).toBeEnabled()
      })

      testDataList.forEach(entry => {
        it(`shows the entry ${entry} as an option`, () => {
          render(
            <TextInput
              register={mockRegister}
              {...requiredProps}
              list={testDataList}
            />
          )

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
  })

  it("makes an input required based on a prop", () => {
    render(
      <TextInput register={mockRegister} {...requiredProps} required={true} />
    )
    const input = screen.getByRole("textbox", { name: testLabel })

    expect(input).toBeEnabled()
    expect(input).toBeRequired()
  })
})
