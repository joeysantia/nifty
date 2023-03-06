import ReviewStars from "./ReviewStars"
import "../../css/ReviewHeader.css"
const ReviewHeader = ({ reviews }) => {
    let avgStars = (reviews.length > 0 && reviews.reduce((prev, cur) => prev + cur.stars, 0) / reviews.length) || 0

    let intStars = Math.floor(avgStars)
    let remainder = avgStars % intStars
    
    if (remainder >= .25) {
        intStars += (remainder >= .75 ? 1 : 0.5)
    }

    return (
        <div className="review-header">
            <ReviewStars stars={intStars} />
            <span>{reviews.length} reviews</span>
        </div>
    )
}

export default ReviewHeader 