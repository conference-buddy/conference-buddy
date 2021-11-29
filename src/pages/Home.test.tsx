import React from "react"
import { render, screen } from "@testing-library/react"
import { Home } from "./Home"

describe("Home", () => {
  it("works", () => {
    render(<Home></Home>)

    expect(screen.getByText("Hello fokkin config world!")).toBeVisible()
  })
})
