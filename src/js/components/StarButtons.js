import star from "../../img/star.png";
import noStar from "../../img/no-star.png";
import "../../css/StarButtons.css"

const StarButtons = ({ stars, setStars }) => {
  let starVals = [1, 2, 3, 4, 5];
  return (
    <div className="star-buttons">
      {starVals.map((x) => {
        return (
          <img
            key={x}
            alt={`${x} stars`}
            data-testid={stars >= x ? "yellow star" : "grey star"}
            src={stars >= x ? star : noStar}
            onClick={(e) => { setStars(x)}}
          />
        );
      })}
    </div>
  );
};

export default StarButtons;
