import "../../css/ReviewStars.css";
import star from "../../img/star.png";
import halfStar from "../../img/half-star.png";
import noStar from "../../img/no-star.png";
const ReviewStars = ({ stars }) => {
  let imgArr = new Array(5).fill("no star");

  for (let i = 1; i <= stars; i++) {
    imgArr[i - 1] = "star";
  }

  if (!Number.isInteger(stars)) {
    imgArr[Math.floor(stars)] = "half star";
  }

  return (
    <div className="review-stars">
      {imgArr.map((img) => {
        return (
          <img
            src={
              img === "star" ? star : img === "half star" ? halfStar : noStar
            }
            alt={img}
          />
        );
      })}
    </div>
  );
};

export default ReviewStars;
