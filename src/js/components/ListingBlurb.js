import { useState } from "react"
import FavoriteButton from "./FavoriteButton"
import ReviewHeader from "./ReviewHeader"

const ListingBlurb = ({ listing }) => {
    const [isMouseHovering, setIsMouseHovering] = useState(false)

    return (
        <div
            onMouseEnter={() => setIsMouseHovering(true)}
            onMouseLeave={() => setIsMouseHovering(false)}
        >
            <img src={listing.images[0]} alt="listing"></img>
            <p>{listing.name}</p>
            <ReviewHeader reviews={listing.reviews} />
            <h4>${listing.price}</h4>
            {isMouseHovering && <FavoriteButton item={listing} />}
        </div>
    )
}

export default ListingBlurb