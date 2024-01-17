import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../Firebase/firebase.init";
import { useState } from "react";
const Home = () => {
  const [userDetails, setUserDetails] = useState(null);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleLoginButton = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        setUserDetails(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleLogOutButton = () => {
    signOut(auth)
      .then((res) => {
        setUserDetails(null);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {userDetails ? (
        <button onClick={handleLogOutButton}>LogOut</button>
      ) : (
        <button onClick={handleLoginButton}>Google Login</button>
      )}
      <p>{userDetails?.displayName}</p>
    </div>
  );
};

export default Home;
