import React, { useState } from "react";
import Input from "./Input";

const AddressInput = ({
  isNewMsg,
  onInputBlur,
  errorMsg,
  selectedConvo,
  addr
}) => {
  const [newAddress, setNewAddress] = useState(addr);
  return (
    <div className="flex flex-row w-full">
      {isNewMsg ? (
        <div className="flex flex-col flex-grow">
          <Input
            setNewValue={setNewAddress}
            placeholder="Enter a wallet address"
            value={newAddress}
            onInputBlur={() => onInputBlur(newAddress)}
          />
          {errorMsg && (
            <span className="new-address text-xs">{errorMsg}</span>
          )}
        </div>
      ) : (
        <b>{selectedConvo}</b>
      )}
    </div>
  );
};

export default AddressInput;