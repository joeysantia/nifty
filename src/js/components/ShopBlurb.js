import FavoriteButton from "./FavoriteButton"
import ReviewHeader from "./ReviewHeader"

const ShopBlurb = ({ shop }) => {
    return (
        <div className="shop-blurb">
            <div className="photo-grid">
                {shop.bannerPhotos.map((img, i) => {
                    return <img 
                                key={i}
                                src={img.src}
                                alt={img.alt}
                            />
                })}
            </div>
            <div className="bottom-row">
                <img src={shop.profilePhoto.src} alt={shop.profilePhoto.alt} />
                <h4>{shop.name}</h4>
                <ReviewHeader reviews={shop.reviews} />
                <FavoriteButton item={shop}/>
            </div>
        </div>
    )
}

export default ShopBlurb