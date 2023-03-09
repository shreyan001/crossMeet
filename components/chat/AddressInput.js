import React, { useState } from "react";
import Input from "./Input";

const AddressInput = ({
  isNewMsg,
  onInputBlur,
  errorMsg,
  selectedConvo,
}) => {
  const [newAddress, setNewAddress] = useState("");
  return (
    <div className={`flex flex-dir-col ${isNewMsg ? "flex-1" : ""}`}>
      {isNewMsg ? (
        <>
          <Input
            setNewValue={setNewAddress}
            placeholder="Enter a wallet address"
            value={newAddress}
            onInputBlur={() => onInputBlur(newAddress)}
          />
          {errorMsg && (
            <span className="new-address flex-dir-col">{errorMsg}</span>
          )}
        </>
      ) : (
        <b>{selectedConvo}</b>
      )}
    </div>
  );
};

export default AddressInput;