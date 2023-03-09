import React, { useContext } from "react";
import { useAccount, useSigner } from "wagmi";
import { XmtpContext } from "../../context/XmtpContext";

const Header = () => {

  const [providerState] = useContext(XmtpContext);
  const { data:signer} = useSigner();
  const {address} = useAccount();

  return (
    <div className="header flex flex-row justify-end mr-5">
      {address &&
        <div className="flex  header-mobile">
          {!providerState.client && (
            <button
              className="button1"
              onClick={() => providerState.initClient(signer)}
            >
              Sign
            </button>
          )}
        </div>
      
      }
    </div>
  );
};

export default Header;
