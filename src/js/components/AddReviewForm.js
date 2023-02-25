import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListingContext } from "../context/ListingContext";
import {
  selectListings,
  editListings,
} from "../reduxFiles/slices/listingSlice";
import { editShops, selectShops } from "../reduxFiles/slices/shopSlice";
import { storage } from "../firebaseFiles/firebase.config";
import uniqid from 'uniqid'
import StarButtons from "./StarButtons";
import popupListener from "../helpers/popupListener"
import "../../css/AddReviewForm.css"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AddReviewForm = ({ removePopup }) => {
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isValid, setIsValid] = useState(true)

  const dispatch = useDispatch();
  const listing = useContext(ListingContext);
  const listings = useSelector(selectListings);
  let shops = useSelector(selectShops);

  useEffect(() => {
    let addReviewForm = document.querySelector('#add-review-form')

    document.body.addEventListener('click',(e) => popupListener(addReviewForm, e.target, removePopup))

    return () => {
      document.body.removeEventListener('click', (e) => popupListener(addReviewForm, e.target, removePopup))
    }
  }, [])

  async function submitReview(e) {
    if (stars === 0) {
        return setIsValid(false)
    }
    e.preventDefault();

    let photoURL = null;
    let reviewId = uniqid()
    if (photo) {
      const storageRef = ref(storage, `images/${reviewId}`)
      await uploadBytes(storageRef, photo)
      photoURL = await getDownloadURL(storageRef)
      console.log(photoURL)
    }

    let review = {
      reviewId,
      stars,
      description,
      photoURL: photoURL,
    };

    for (let i = 0; i < listings.length; i++) {
      if (listings[i].id === listing.id) {
        listings[i].reviews.push(review);
        dispatch(editListings(listings));
        break;
      }
    }

    for (let i = 0; i < shops.length; i++) {
      if (shops[i].id === listing.shopId) {
        shops[i].reviews.push(review);
        dispatch(editShops(shops));
        break;
      }
    }

    removePopup()
  }

  return (
    <form id="add-review-form" onSubmit={(e) => submitReview(e)}>
      <legend>
        <h2>Write a review</h2>
        <p>Your review and profile information will be publicly displayed.</p>
      </legend>
      <div>
        <h3>{listing.name}</h3>
        <StarButtons stars={stars} setStars={setStars} />
      </div>
      <textarea
        required={false}
        placeholder={"Write your review..."}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label>Upload a photo</label>
      <input
        required={false}
        title="review-photo"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => setPhoto(e.target.files[0])}
      >
      </input>
      {!isValid && <div>You must select a number of stars.</div>}
      <button type="submit">Post your review</button>
    </form>
  );
};

export default AddReviewForm;
