import {cleanup, render, screen} from "@testing-library/react";
import PageNotFound from "./404";

describe('PageNotFound', ()=> {
    beforeAll(()=> {
        render(<PageNotFound />)
    })

    afterAll(cleanup)

    it('shows a 404 page', ()=> {
        const title = screen.getByRole('heading', { name: "Page not found"})
        expect(title).toBeVisible()
    })
})