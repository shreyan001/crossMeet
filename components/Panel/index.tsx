import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import SigninBtn from "../SigninBtn";
import PrimaryProfileCard from "../../Cards/PrimaryProfileCard";
import { useRouter } from "next/router";

const Panel = () => {
  const { accessToken, primaryProfile } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className="panel">
      <div>
        {primaryProfile && <PrimaryProfileCard {...primaryProfile} />}
        <div>
          {!accessToken && <SigninBtn />}
          {!primaryProfile?.profileID && (
            <button
              className="button1"
              onClick={() => router.push("https://testnet.cyberconnect.me/")}
            >
              Mint Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panel;