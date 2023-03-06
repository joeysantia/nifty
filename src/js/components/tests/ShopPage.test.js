import { render, screen } from "@testing-library/react"
import ShopPage from "../ShopPage"

jest.mock('../FavoriteButton.js', () => () => {
    return <h1>Favorite Button</h1>
})

jest.mock("../ListingBlurb.js", () => () => {
    return <h1>Listing Blurb</h1>
})

jest.mock("../ReviewHeader.js", () => () => {
    return <h1>Review Header</h1>
})

jest.mock("../ReviewList.js", () => () => {
    return <h1>Review Listing</h1>
})

describe("ShopPage", () => {

    let shop = {
        name: "Homemade Goods",
        id: "123",
        type: "shop",
        profilePhoto: "www.photo.com",
        bannerPhotos: [
            {
                src: "www.photo.com",
                alt: "banner"
            },
            {
                src: "www.photo.com",
                alt: "banner"
            }
        ],
        city: "Santa Fe",
        descritpion: "We make homemade goods",
        reviews: [{
            id: '123',
            userPhoto: "www.photo.com",
            stars: 4,
            description: "Great item!",
            img: {
                src: "www.photo.com",
                alt: "review"
            }
        },
        {
            id: '456',
            userPhoto: "www.photo.com",
            stars: 5,
            description: "Love it!",
            img: {
                src: "www.photo.com",
                alt: "review"
            }
        }],
        listings: [{
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
          },]
      }
    it('renders as a main element with photos, child components, and shop info', () => {
        render(<ShopPage shop={shop} />)
        expect(screen).toMatchSnapshot()
    })
})