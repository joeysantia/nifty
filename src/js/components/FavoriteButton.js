import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import listingSlice, { editListings, selectListings } from "../reduxFiles/slices/listingSlice"
import { editShops, selectShops } from "../reduxFiles/slices/shopSlice"
import { editFavoriteItems, editFavoriteShops, editUser, selectUser } from "../reduxFiles/slices/userSlice"
import heart from "../../img/heart.png"
import noHeart from "../../img/no-heart.png"

const FavoriteButton = ({ item }) => {
    let user = JSON.parse(JSON.stringify(useSelector(selectUser)))
    console.log(user.favoriteItems)
    let dispatch = useDispatch()

    const [isFavorited, setIsFavorited] = useState(() => {
        for (const favItem of (item.type === "listing" ? user.favoriteItems : user.favoriteShops)) {
            if (favItem.id === item.id) {
                return true 
            }
        }
        return false 
    })

    //let isFavoritedRef = useRef(isFavorited)

    function handleFavoriteChange() {
        if (!isFavorited) {
            (item.type === 'listing' ? user.favoriteItems : user.favoriteShops).push(item)
        } else {
            (item.type === 'listing' ? user.favoriteItems : user.favoriteShops).filter(cur => cur.id !== item.id)
        }
        dispatch(editUser(user))
        setIsFavorited(isFavorited => !isFavorited)
        console.log('click event ran')
    }
    
/*
    useEffect(() => {
        let isFavRef = isFavoritedRef.current

        return () => {

            if (isFavRef !== item.isFavorited) {
                
                let items = (item.type === 'listing' ? listings : shops)
                item.isFavorited = isFavRef
                for (let i = 0; i < items.length; i++) {
                    if (items[i].id === item.id) {
                        items[i].isFavorited = isFavRef
                        dispatch(item.type === 'listing' ? editListings(items) : editShops(items))
                    } 
                }
                

                if (isFavRef) {
                    (item.type === 'listing' ? user.favoriteItems : user.favoriteShops).push(item)
                } else {
                    (item.type === 'listing' ? user.favoriteItems : user.favoriteShops).filter(cur => cur.id !== item.id)
                }
                dispatch(item.type === 'listing' ? editFavoriteItems(user.favoriteItems) : editFavoriteShops(user.favoriteShops))

            }
        }
    }, [isFavorited])
*/
    return (
        <div onClick={() => handleFavoriteChange()}>
            <img src={isFavorited ? heart : noHeart} alt={isFavorited ? 'red heart' : 'empty heart'} />
        </div>
    )
}

export default FavoriteButton