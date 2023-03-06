import { render, screen } from "@testing-library/react"
import SearchResults from "../SearchResults"

jest.mock('../ListingBlurb.js', () => () => {
    return <h1 data-testid="listing-blurb">Listing Blurb has rendered</h1>
})

jest.mock('../ShopBlurb.js', () => () => {
    return <h1 data-testid="shop-blurb">Shop Blurb</h1>
})

let results = [
    {
        name: "Homemade Goods",
        id: "123",
        type: "shop",
        profilePhoto: "www.photo.com",
        bannerPhotos: [],
        city: "Santa Fe",
        descritpion: "We make homemade goods",
        reviews: [],
        listings: []
      },
      {
        name: "shoes",
        id: "abcdefg",
        type: "listing",
        shopId: "123",
        price: 29.95,
        description: "New pair of shoes",
        options: [],
        images: [],
        reviews: [],
      },
      {
        name: "shirt",
        id: "hijklmn",
        type: "listing",
        shopId: "456",
        price: 19.95,
        description: "Brand new t-shirt",
        options: [],
        images: [],
        reviews: [],
      },
]



describe("SearchResults", () => {
    it('renders as a main with a heading and child components', () => {
        render(<SearchResults results={results} />)
        expect(screen).toMatchSnapshot()
    })

    it('renders one ListingBlurb per listing in the results', () => {
        render(<SearchResults results={results} />)
        expect(screen.getAllByTestId('listing-blurb').length).toEqual(2)
    })

    it('renders one ShopBlurb per shop in the results', () => {
        render(<SearchResults results={results} />)
        expect(screen.getAllByTestId('shop-blurb').length).toEqual(1)
    })
})