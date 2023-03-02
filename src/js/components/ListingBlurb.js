import { useState } from "react";
import FavoriteButton from "./FavoriteButton";
import ReviewHeader from "./ReviewHeader";
import "../../css/ListingBlurb.css"

const ListingBlurb = ({ listing }) => {
  const [isMouseHovering, setIsMouseHovering] = useState(false);

  return (
    <div
      className="listing-blurb"
      onMouseEnter={() => setIsMouseHovering(true)}
      onMouseLeave={() => setIsMouseHovering(false)}
    >
      <img src={listing.img.src} alt={listing.img.alt}></img>
      <p>{listing.name}</p>
      <ReviewHeader reviews={listing.reviews} />
      <h4>${listing.price}</h4>
      {isMouseHovering && <FavoriteButton item={listing} />}
    </div>
  );
};

export default ListingBlurb;
