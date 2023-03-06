import FavoriteButton from "./FavoriteButton"
import ListingBlurb from "./ListingBlurb"
import ReviewHeader from "./ReviewHeader"
import ReviewList from "./ReviewList"
import '../../css/ShopPage.css'
import { useSelector } from "react-redux"
import { selectUser } from "../reduxFiles/slices/userSlice"

const ShopPage = ({ shop }) => {

    let user = useSelector(selectUser)

    function userHasFavoritedShop() {
        let userFavShopsString = JSON.stringify(user.favoriteShops)
        let shopString = JSON.stringify(shop)

        return userFavShopsString.indexOf(shopString) >= 0
    }

    return (
        <main id="shop-page">
            <div id="banner-photo-container">
                {shop.bannerPhotos.map((photo, i) => {
                    return <img key={i} src={photo.src} alt={photo.alt} />
                })}
            </div>
            <div className="middle-row">
                <div></div>
                <img src={shop.profilePhoto.src} alt={shop.profilePhoto.alt} />
                <div className="fav-button-container">
                    <FavoriteButton item={shop} />
                    <span>{userHasFavoritedShop() ? "Following shop" : "Follow shop"}</span>
                </div>
            </div>
            <h2>{shop.name}</h2>
            <p>{shop.location}</p>
            <ReviewHeader reviews={shop.reviews} />
            <p>{shop.description}</p>
            <section>
                {shop.listings.map((listing, i) => {
                    return <ListingBlurb key={i} listing={listing} />
                })}
            </section>
            <ReviewList reviews={shop.reviews} />
        </main>
    )
}

export default ShopPage