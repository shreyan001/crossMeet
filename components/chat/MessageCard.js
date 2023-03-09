import React from "react";


const MessageCard = ({ msg }) => {
  return (
    <>
      <div className="msg-header flex justify-start">
        <div className="identicon" />
        <div className="convo-info align-start flex-dir-col flex justify-start">
          <div>
            <b>{msg.senderAddress}</b>
          </div>
          <div>{msg.content}</div>
        </div>
      </div>
    </>
  );
};

export default MessageCard;
