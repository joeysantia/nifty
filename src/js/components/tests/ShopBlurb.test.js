import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../../reduxFiles/store"
import ShopBlurb from "../ShopBlurb"
import InitStore from "./utils/InitStore"
import shoes from "../../../img/shoes.jpg"
import star from "../../../img/star.png"
import woodBowl from "../../../img/wood-bowl.jpg"
import woodSpoonSet from "../../../img/wood-spoon-set.jpg"
import woodSpoon from "../../../img/wood-spoon.jpg"

describe("ShopBlurb", () =>{
    let shop = {
      name: "Homemade Goods",
      id: "zyxwuc",
      type: "shop",
      profilePhoto: {
        src: "../../../img/star.png",
        alt: "star"
      },
      bannerPhotos: [
        {
            src: "../../../img/wood-bowl.jpg",
            alt: "bowl"
          },
          {
            src: "../../../img/wood-spoon-set.jpg",
            alt: "spoon set"
          },
          {
            src: "../../../img/wood-spoon.jpg",
            alt: "spoon"
          },
          {
            src: "../../../img/shoes.jpg",
            alt: "shoes"
          },
      ],
      city: "Santa Fe",
      descritpion: "We make homemade goods",
      reviews: [],
    }
    it("renders as a div with images, a title, ReviewHeader, and FavoriteButton", () => {
        render(<Provider store={store}>
            <InitStore />
            <ShopBlurb shop={shop} />
        </Provider>)
        expect(screen).toMatchSnapshot()
    })


})

