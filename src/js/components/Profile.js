import { findAllByDisplayValue } from "@testing-library/dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../firebaseFiles/firestoreDB";
import { selectUser } from "../reduxFiles/slices/userSlice";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import AboutPopup from "./AboutPopup";
import ListingBlurb from "./ListingBlurb";
import ShopBlurb from "./ShopBlurb";

export default function Profile() {
  let { userId } = useParams();
  let curUser = useSelector(selectUser);
  console.log(curUser)
  const [favItemsFocused, setFavItemsFocused] = useState(true);
  const [aboutPopupRendered, setAboutPopupRendered] = useState(false);
  const [viewingOwnProfile, setViewingOwnProfile] = useState(
    curUser && userId === curUser.id
  );
  const [user, setUser] = useState(() => {
    let user;
    if (viewingOwnProfile) {
      user = curUser;
    } else {
      user = getUser(userId);
    }

    return user;
  });
  console.log(user.favoriteShops)

  function generateFavItemsImgs(favItems) {
    let imgs = [];
    let items = favItemsFocused ? user.favoriteItems : user.favoriteShops;
    
    let i = 0;
    while (imgs.length < 4) {
      imgs.push(
        items[i]
          ? items[i++].images[0]
          : {
              src: "www.photo.com" /** insert grey sq src here! */,
              alt: "no item",
            }
      );
    }
    return imgs.map((img, i) => {
        return <img key={i} src={img.src} alt={img.alt} />
    })
  }

  let favItems = user.favoriteItems;
  let favShops = user.favoriteShops;
  return (
    <main id="profile">
      <div className="profile-pic-container">
        <img src={user.profilePhotoURL} alt={'profile-pic'} />
      </div>
      <h2>{user.name}</h2>
      <div className="profile-button-row">
        {viewingOwnProfile && <Link to="user/editProfile">Edit Profile</Link>}
        <button>{`About ${user.name.split(" ")[0]}`}</button>
        {aboutPopupRendered && (
          <AboutPopup
            user={user}
            removePopup={() => setAboutPopupRendered(false)}
          />
        )}
      </div>
      <div>
        <div
          className="fav-item-button"
          onClick={() => setFavItemsFocused(true)}
        >
          <div className="img-square">{generateFavItemsImgs(favItems)}</div>
          <h4>Favorite items</h4>
          <p>{`${favItems.length} item${favItems.length > 1 ? "s" : ""}`}</p>
        </div>
        <div
          className="fav-shop-button"
          onClick={() => setFavItemsFocused(false)}
        >
          <div className="img-square">
            <img src={favShops.length ? favShops[0].images[0].src : 'www.photo.com'} alt="favorite shop" />
          </div>
          <h4>Favorite Shops</h4>
          <p>{`${favShops.length} item${favShops.length > 1 ? "s" : ""}`}</p>
        </div>
      </div>
      <section>
        <div className="top-row">
          <h2>{`Favorite ${favItemsFocused ? "Items" : "Shops"}`}</h2>
          {favItemsFocused
            ? favItems.map((item, i) => <ListingBlurb key={i} listing={item} />)
            : favShops.map((shop, i) => <ShopBlurb key={i} shop={shop} />)}
        </div>
      </section>
    </main>
  );
}
