import { useEffect } from "react";
import { useSelector } from "react-redux";
import popupListener from "../helpers/popupListener";
import { selectUser } from "../reduxFiles/slices/userSlice";
import { Link } from "react-router-dom";
import locationIcon from "../../img/location-pin.png"
import removeIcon from "../../img/cancel.png"

const AboutPopup = ({ user, removePopup }) => {
 
    let curUser = useSelector(selectUser);

  useEffect(() => {
    let aboutPopup = document.querySelector("#about-popup");
    document.body.addEventListener("click", (e) =>
      popupListener(aboutPopup, e.target, removePopup)
    );

    return () => {
      document.body.removeEventListener("click", (e) =>
        popupListener(aboutPopup, e.target, removePopup)
      );
    };
  });

  return (
    <section id="about-popup">
      <img src={removeIcon} alt="remove" onClick={() => removePopup()} />
      <h2>About</h2>
      <div>
        <img src={user.photoURL} alt="profile" />
        <h2>{user.name}</h2>
        <p>
          <img src={locationIcon} alt="location" />
          {user.address.city}
        </p>
        {curUser && user.id === curUser.id && (
          <Link to={`/user/${user.id}`} data-testid="first link">Edit public profile</Link>
        )}
      </div>
      <p>{user.about}</p>
      <p>{`Favorite Materials: ${user.favoriteMaterials}`}</p>
      <div className="bottom-row">
        {curUser && user.id === curUser.id && (
          <Link to={`/user/${user.id}`}>
            <button>Edit public profile</button>
          </Link>
        )}
        <button onClick={() => removePopup()}>Done</button>
      </div>
    </section>
  );
};

export default AboutPopup