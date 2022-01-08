import { render, screen, cleanup, RenderResult } from "@testing-library/react"
import { Header } from "./Header"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactElement } from "react"

export function renderWithClient(client: QueryClient, ui: ReactElement) {
  const { rerender, ...result } = render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  )
  return {
    ...result,
    rerender: (rerenderUi: ReactElement) =>
      rerender(
        <QueryClientProvider client={client}>{rerenderUi}</QueryClientProvider>
      ),
  }
}

describe("Header", () => {
  let component: RenderResult
  beforeAll(() => {
    const queryClient = new QueryClient()
    component = renderWithClient(queryClient, <Header />)
  })

  afterAll(cleanup)

  it("renders the header element", () => {
    const header = screen.getByRole("banner")
    expect(header).toBeVisible()
  })

  it("renders all necessary elements", () => {
    expect(component.asFragment()).toMatchSnapshot()
  })
})
