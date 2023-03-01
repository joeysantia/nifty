import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ListingBlurb from "../ListingBlurb"
import shoes from "../../../img/shoes.jpg"

jest.mock("../FavoriteButton", () => () => {
    return <h1>Favorite Button</h1>
})

describe("ListingBlurb", () => {
    let listing = {
        name: "shoes",
        id: 'abcdefg',
        type: "listing",
        shopId: "123",
        price: 29.95,
        description: "New pair of shoes",
        options: [],
        images: [{shoes}],
        reviews: [],
    }
      

    it("renders with the listing's image, name, price, and reviews", () => {
        render(<ListingBlurb listing={listing} />)
        expect(screen).toMatchSnapshot()
    })

    it("does not automatically render the FavoriteButton", () => {
        render(<ListingBlurb listing={listing} />)
        expect(screen.queryByText("Favorite Button")).not.toBeInTheDocument()
    })

    it("renders the FavoriteButton when the mouse hovers over the component", () => {
        render(<ListingBlurb listing={listing} />)
        userEvent.hover(screen.getByAltText("listing"))
        expect(screen.getByText("Favorite Button")).toBeInTheDocument()
    })

    it("unrenders the FavoriteButton component when the mouse leaves the component", () => {
        render(<ListingBlurb listing={listing} />)
        userEvent.hover(screen.getByAltText("listing"))
        userEvent.unhover(screen.getByAltText("listing"))
        expect(screen.queryByText("Favorite Button")).not.toBeInTheDocument()
    })
})