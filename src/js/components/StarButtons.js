import star from "../../img/star.png";
import noStar from "../../img/no-star.png";
const StarButtons = ({ stars, setStars }) => {
  let starVals = [1, 2, 3, 4, 5];
  return (
    <div>
      {starVals.map((x) => {
        return (
          <img
            key={x}
            alt={`${x} stars`}
            title={stars >= x ? "yellow star" : "grey star"}
            src={stars >= x ? star : noStar}
            onClick={(e) => { console.log(x); setStars(x)}}
          />
        );
      })}
    </div>
  );
};

export default StarButtons;
