import React from "react";
import Input from "./Input";

const MessageComposer = ({ msgTxt, setMsgTxt, sendNewMessage }) => {
  return (
    <div className=" ml-3 flex flex-row w-11/12 items-center">
      <Input
        setNewValue={setMsgTxt}
        placeholder="Write a message"
        value={msgTxt}
      />
      <button className="button1" onClick={sendNewMessage}>
        Send
      </button>
    </div>
  );
};

export default MessageComposer;
