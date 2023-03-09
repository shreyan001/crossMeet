import { useState, useEffect, useContext } from "react";
import { useAccount } from "wagmi";
import { XmtpContext } from "../context/XmtpContext";

const useStreamMessages = (peerAddress) => {
  const {address} = useAccount();
  const [providerState, setProviderState] = useContext(XmtpContext);
  const { client, convoMessages } = providerState;
  const [stream, setStream] = useState("");
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    const getConvo = async () => {
      if (!client || !peerAddress) {
        return;
      }
      setConversation(await client.conversations.newConversation(peerAddress));
    };
    getConvo();
  }, [client, peerAddress]);

  useEffect(() => {
    if (!conversation) return;

    const streamMessages = async () => {
      const newStream = await conversation.streamMessages();
      setStream(newStream);
      for await (const msg of newStream) {
        if (setProviderState) {
          const newMessages = convoMessages.get(conversation.peerAddress) ?? [];
          newMessages.push(msg);
          const uniqueMessages = [
            ...Array.from(
              new Map(newMessages.map((item) => [item["id"], item])).values()
            ),
          ];
          convoMessages.set(conversation.peerAddress, uniqueMessages);
          setProviderState({
            ...providerState,
            convoMessages: new Map(convoMessages),
          });
        }
      }
    };
    streamMessages();

    return () => {
      const closeStream = async () => {
        if (!stream) return;
        await stream.return();
      };
      closeStream();
    };
    // eslint-disable-next-line
  }, [convoMessages, address, conversation]);
};

export default useStreamMessages;