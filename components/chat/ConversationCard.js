import React from "react";




export const truncate = (str, length) => {
    if (!str) {
      return str;
    }
    if (str.length > length) {
      return `${str.substring(0, length - 3)}...`;
    }
    return str;
  };

const ConversationCard = ({ setSelectedConvo, addr, latestMessage }) => {
  return (
    <div
      onClick={() => setSelectedConvo(addr)}
      className="conversation-header flex justify-start"
    >
      <div className="identicon" />
      <div className="flex convo-info align-start flex-dir-col justify-start">
        <div>
          <b>{addr}</b>
        </div>
        <div>{latestMessage && truncate(latestMessage.content, 75)}</div>
      </div>
    </div>
  );
};

export default ConversationCard;
