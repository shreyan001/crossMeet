import "../flow/config";
import { useAuth } from "../contexts/AuthContext";
import Link from 'next/link';


function Landing() {
  const { currentUser, logOut, logIn } =
    useAuth();

  
  const AuthedState = () => {
    const address = currentUser?.addr ;
const reducedAddress = address.slice(0, 5) + "..";

    return (
      <div className="loginholder">
        <div className=" addr">{ reducedAddress ?? "No Address"}</div>
        <button className="button1 z-20" onClick={logOut}>Log Out</button>

      </div>
    );
  };

  const UnauthenticatedState = () => {
    return (
      <div>
        <button className="button1" onClick={logIn}>Log In</button>
      </div>
    );
  };


  return (
    <div>
      <div className=" ">
    {currentUser?.loggedIn ? <AuthedState /> : <UnauthenticatedState />}
      </div>
    </div>
  );
}

export default Landing;
