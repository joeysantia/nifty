import { useContext, useEffect, useState } from "react";
import Counter from "./Counter";
import { getSubtotal } from "../helpers/totalFns";
import { useDispatch, useSelector } from "react-redux";
import {
  editListings,
  selectListings,
} from "../reduxFiles/slices/listingSlice";
import { editUser, selectUser } from "../reduxFiles/slices/userSlice";

const ItemSummary = ({ item, cart, setCart }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    let updatedItem = JSON.parse(JSON.stringify(item))
    updatedItem.quantity = quantity
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === updatedItem.id) {
        cart[i] = updatedItem
        setCart(cart)
        break;
      }
    }
  }, [quantity]);

  function getItemArray() {
    return new Array(quantity).fill(item);
  }


  return (
    <div className="item-summary">
      <div className="top-row">
        <img src={item.images[0].src} alt={item.images[0].alt} />
        <p>{item.name}</p>
      </div>
      <div className="bottom-row">
        <Counter quantity={item.quantity} setQuantity={setQuantity} />
        <h3>${getSubtotal(getItemArray())}</h3>
        <button onClick={() => setCart(cart.filter(curItem => curItem.id !== item.id))}>Remove from cart</button>
      </div>
    </div>
  );
};

export default ItemSummary;
