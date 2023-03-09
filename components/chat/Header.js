import React, { useContext } from "react";
import { useAccount, useSigner } from "wagmi";
import { XmtpContext } from "../../context/XmtpContext";

const Header = () => {

  const [providerState] = useContext(XmtpContext);
  const { data:signer} = useSigner();
  const {address} = useAccount();

  return (
    <div className="header flex align-center justify-between">
      {address &&
        <div className="flex align-center header-mobile">
          <h3>{address}</h3>
          {!providerState.client && (
            <button
              className="btn"
              onClick={() => providerState.initClient(signer)}
            >
              Connect to XMTP
            </button>
          )}
        </div>
      
      }
    </div>
  );
};

export default Header;
