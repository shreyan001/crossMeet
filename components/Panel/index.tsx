import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import SigninBtn from "../SigninBtn";
import PrimaryProfileCard from "../../Cards/PrimaryProfileCard";
import { useRouter } from "next/router";
import SignupForm from "../forms/SignupForm";

const Panel = () => {
  const { accessToken, primaryProfile } = useContext(AuthContext);
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="panel">
      <div>
      <SignupForm isOpen={modalIsOpen} onClose={handleCloseModal}/>
        {primaryProfile && <PrimaryProfileCard {...primaryProfile} />}
        <div>
          {!accessToken && <SigninBtn />}
          {!primaryProfile?.profileID && (
            <button
              className="button1"
              onClick={handleOpenModal}
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