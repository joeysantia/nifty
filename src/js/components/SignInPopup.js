import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebaseFiles/firebase.config";
import popupListener from "../helpers/popupListener";
import "../../css/SignInPopup.css";
import cancelIcon from "../../img/cancel.png";
import googleIcon from "../../img/google.png";

const SignInPopup = ({ removePopup }) => {
  const [registeringNewAccount, setRegisteringNewAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputsAreValid, setInputsAreValid] = useState(false);

  useEffect(() => {
    const signInPopup = document.querySelector("#sign-in-popup");
    document.body.addEventListener("click", (e) => {
      popupListener(signInPopup, e.target, removePopup)
  });
    return () => {
      document.body.removeEventListener("click", (e) =>
        popupListener(signInPopup, e.target, removePopup)
      );
    };
  }, []);

  useEffect(() => {
    let emailRegex = /(?=.*@)(?=.*\.)/;
    let passwordRegex = /(?=.*[A-Z])(?=.*[0-9]).{8,}/;

    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      !inputsAreValid
    ) {
      setInputsAreValid(true);
    }
  }, [email, password]);

  return (
    <div id="sign-in-popup">
      <form onSubmit={(e) => signInWithEmailAndPassword(auth, email, password)}>
        <img src={cancelIcon} alt="delete" onClick={() => removePopup()} />
        <div className="top-row">
          <h2>{registeringNewAccount ? "Create your account" : "Sign in"}</h2>
            
            <button
              data-testid="register-button-one"
              onClick={() => setRegisteringNewAccount(registeringNewAccount => !registeringNewAccount)}
            >
              {registeringNewAccount ? "Sign In" : "Register"}
            </button>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            data-testid="email"
            required
            onInput={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            data-testid="password"
            required
            onInput={(e) => setPassword(e.target.value)}
          />
          {registeringNewAccount ? (
            <p><strong>
              *Passwords must be at least 8 characters long and contain a capital
              letter and a number.
            </strong></p>
          ) : null}
        </div>
        <button
          data-testid="register-button-two"
          type="submit"
          disabled={!inputsAreValid}
        >
          {registeringNewAccount ? "Register" : "Sign In"}
        </button>
      </form>
      <div>
        <button
          id="google-button"
          onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
        >
          <img src={googleIcon} alt="google"></img>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SignInPopup;
