import {
  GithubAuthProvider,
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
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleLoginButton = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        setUserDetails(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGithubLoginButton = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        console.log(result.user);
        setUserDetails(result.user);
      })
      .catch((error) => {
        console.log(error);
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
        <div>
          <button onClick={handleGoogleLoginButton}>Google Login</button>
          <button onClick={handleGithubLoginButton}>Github Login</button>
        </div>
      )}
      <p>{userDetails?.displayName}</p>
      <img src={userDetails?.photoURL} alt="" />
    </div>
  );
};

export default Home;
