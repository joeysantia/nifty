import { app } from "./firebase.config";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const db = getFirestore(app);
const users = collection(db, "users");
const listings = collection(db, "listings");
const shops = collection(db, "shops");

export async function addUser(user) {
  try {
    await setDoc(doc(users, user.uid), {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      id: user.uid,
      cart: [],
      gender: "prefer not to say",
      city: "",
      about: "",
      favoriteMaterials: "",
      favoriteItems: [],
      favoriteShops: [],
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getUser(id) {
  try {
    let user = await getDoc(doc(db, "users", id));
    return user.data();
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function getListings() {
  try {
    let listings = await getDoc(doc(db, "listings", "listingMap"));
    return listings.data();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getShops() {
  try {
    let shops = await getDoc(doc(db, "shops", "shopMap"));
    return shops.data();
  } catch (err) {
    console.error(err);
    return [];
  }
}
