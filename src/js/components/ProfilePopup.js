import { signOut } from "firebase/auth"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import popupListener from "../helpers/popupListener"
import { selectUser } from "../reduxFiles/slices/userSlice"

const ProfilePopup = ({ removePopup }) => {

    let user = useSelector(selectUser)

    useEffect(() => {
        let profilePopup = document.querySelector('#profile-popup')
        document.body.addEventListener('click', (e) => popupListener(profilePopup, e.target, removePopup))

        return () => {
            document.body.removeEventListener('click', (e) => popupListener(profilePopup, e.target, removePopup))
        }
    })

    return (
        <div id="profile-popup">
            <div className="top-row">
                <img src={user.photoURL} alt="user" />
                <div className="right-box">
                    <h3>{user.name}</h3>
                    <Link to={`user/${user.id}`}>View your profile</Link>
                </div>
                <div onClick={() => signOut()}>
                    <img src="replace-me" alt="sign-out" />
                    <span>Sign out</span>
                </div>
            </div>
            
        </div>
    )
}

export default ProfilePopup