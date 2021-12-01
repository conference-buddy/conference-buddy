import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import { Home } from "./Home"

describe("Home", () => {
  beforeAll(() => {
    render(<Home />)
  })

  afterAll(cleanup)

  it("works", () => {
    const headline = screen.getByRole("heading", {
      name: "Hello world, this is Conference Buddy",
    })
    expect(headline).toBeVisible()
  })
})
