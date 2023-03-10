const { arrayify } = require('@ethersproject/bytes');
const {
  NotifiContext,
  NotifiInputFieldsText,
  NotifiInputSeparators,
  NotifiSubscriptionCard,
} = require('@notifi-network/notifi-react-card');
require('@notifi-network/notifi-react-card/dist/index.css');
const { useEthers } = require('@usedapp/core');
const { providers } = require('ethers');
const React = require('react');

const Notifi = () => {
  const { account, library } = useEthers();
  const signer = useMemo(() => {
    if (library instanceof providers.JsonRpcProvider) {
      return library.getSigner();
    }
    return undefined;
  }, [library]);

  if (account === undefined || signer === undefined) {
    // account is required
    return null;
  }

  const inputLabels = {
    label: {
      email: 'Email',
      sms: 'Text Message',
      telegram: 'Telegram',
    },
    placeholderText: {
      email: 'Email',
    },
  };

  const inputSeparators = {
    smsSeparator: {
      content: 'OR',
    },
    emailSeparator: {
      content: 'OR',
    },
  };

  return (
    React.createElement(NotifiContext, {
      dappAddress: '<YOUR OWN DAPP ADDRESS HERE>',
      env: 'Development',
      signMessage: async (message) => {
        const result = await signer.signMessage(message);
        return arrayify(result);
      },
      walletPublicKey: account,
      walletBlockchain: 'ETHEREUM' // NOTE - Please update to the correct chain name.
      // If Polygon, use 'POLYGON'
      // If Arbitrum, use 'ARBITRUM'
      // If Binance, use 'BINANCE'
    },
    React.createElement(NotifiSubscriptionCard, {
      cardId: '<YOUR OWN CARD ID HERE>',
      inputLabels: inputLabels,
      inputSeparators: inputSeparators,
      darkMode: true // optional
    }))
  );
};
