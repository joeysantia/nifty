import { render, screen } from "@testing-library/react";
import FeaturedShops from "../FeaturedShops";

jest.mock("../ShopBlurb.js", () => () => {
    return <h1 data-testid="shop-blurb">ShopBlurb has rendered</h1>
})

describe("ShopBlurb", () => {

    let shops = [
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
            name: "Deluxe Goods",
            id: "456",
            type: "shop",
            profilePhoto: "www.photo.com",
            bannerPhotos: [],
            city: "Santa Fe",
            descritpion: "We make deluxe goods",
            reviews: [],
            listings: []
          },
      ];

    it('renders a container with a list of ShopBlurbs', () => {
        render(<FeaturedShops shops={shops} />)
        expect(screen).toMatchSnapshot()
    })

    it('renders one ShopBlurb per shop', () => {
        render(<FeaturedShops shops={shops} />)
        expect(screen.getAllByTestId('shop-blurb').length).toEqual(2)
    })
})