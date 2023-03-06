import FavoriteButton from "./FavoriteButton"
import ListingBlurb from "./ListingBlurb"
import ReviewHeader from "./ReviewHeader"
import ReviewList from "./ReviewList"

const ShopPage = ({ shop }) => {
    return (
        <main id="shop-page">
            <div>
                {shop.bannerPhotos.map((photo, i) => {
                    return <img key={i} src={photo.src} alt={photo.alt} />
                })}
            </div>
            <div>
                <img src={shop.profilePhoto.src} alt={shop.profilePhoto.alt} />
                <div>
                    <FavoriteButton item={shop} />
                    <span>Follow shop</span>
                </div>
            </div>
            <h2>{shop.name}</h2>
            <p>{shop.location}</p>
            <ReviewHeader reviews={shop.reviews} />
            <p>{shop.description}</p>
            <section>
                {shop.listings.map((listing, i) => {
                    return <ListingBlurb listing={listing} />
                })}
            </section>
            <ReviewList reviews={shop.reviews} />
        </main>
    )
}

export default ShopPage