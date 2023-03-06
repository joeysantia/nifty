import { useState } from "react"
import AddReviewForm from "./AddReviewForm"
import ReviewHeader from "./ReviewHeader"
import ReviewStars from "./ReviewStars"

const ReviewList = ({ reviews }) => {
    const [formIsRendered, setFormIsRendered] = useState(false)

    return (
        <section id="review-list">
            {formIsRendered && <AddReviewForm removePopup={() => setFormIsRendered(false)}/>}
            <ReviewHeader reviews={reviews} />
            <div onClick={() => setFormIsRendered(true)}>
                <img src={'replace-me'} alt="add button"></img>
                <p>Add your review</p>
                {reviews.map((review, i) => {
                    return (
                        <div key={i}>
                            <div className="left-col">
                                <ReviewStars stars={review.stars} />
                                <p>
                                    {review.description}
                                </p>
                                <div>
                                    <img src={review.userPhoto} alt='user' />
                                    <p>{review.userName}</p>
                                    <p>{review.date}</p>
                                </div>
                                {review.img.src ? <img src={review.img.src} alt={review.img.alt} /> : null}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}   

export default ReviewList 