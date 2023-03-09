import React from "react";
import ConversationCard from "./ConversationCard";

const ConversationList = ({ convoMessages, setSelectedConvo }) => {
  
  const getLatestMessage = (messages) =>
  messages?.length ? messages[messages.length - 1] : null;

  const sortedConvos = new Map(
    [...convoMessages.entries()].sort((convoA, convoB) => {
      return getLatestMessage(convoA[1])?.sent <
        getLatestMessage(convoB[1])?.sent
        ? 1
        : -1;
    })
  );

  return (
    <>
      {Array.from(sortedConvos.keys()).map((addr) => {
        if (sortedConvos.get(addr).length > 0) {
          return (
            <ConversationCard
              key={"Convo_" + addr}
              setSelectedConvo={setSelectedConvo}
              addr={addr}
              latestMessage={getLatestMessage(sortedConvos.get(addr))}
            />
          );
        } else return null;
      })}
    </>
  );
};

export default ConversationList;
