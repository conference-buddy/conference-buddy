import React from 'react'
import { render, screen, cleanup } from "@testing-library/react"
import IndexPage from "./index"

describe("IndexPage", () => {
  beforeAll(() => {
    render(<IndexPage />)
  })

  afterAll(cleanup)

  it("works", () => {
    const headline = screen.getByRole("heading", {
      name: "Hello world, this is Conference Buddy",
    })
    expect(headline).toBeVisible()
  })

  it("shows a button", () => {
    const button = screen.getByRole("button", {
      name: "test button",
    })

    expect(button).toBeEnabled()
  })
})
