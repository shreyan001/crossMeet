import "../styles/globals.css";
import Link from "next/link";
import "../styles/custom.css";
import 'react-toastify/dist/ReactToastify.css';
import MobileWarning from '../components/functions/CheckRes.js'
import {createReactClient,studioProvider,LivepeerConfig} from '@livepeer/react';
import { useState,useEffect } from "react";
import "../styles/Cards.css"
import "../styles/Screen.css"
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider,  darkTheme , getDefaultWallets} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, useAccount, WagmiConfig } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { XmtpContextProvider } from "../context/XmtpContext";
import { Buffer } from "buffer";

const { chains, provider } = configureChains(
  [bscTestnet],
  [
    jsonRpcProvider({
      rpc: chain => ({
        http: process.env.NEXT_PUBLIC_RPC_QUICKNODE,
      }),
    }), publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})



function MyApp({ Component, pageProps }) {
  

  const [showPopup,setShowPopup] = useState(false);

  
const client = createReactClient ({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_PUBL_KEY
  }),
});




  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1024) {
      setShowPopup(true);
    }
  }, []);
  
  return (
    <div>
   
      <main className="container">
      <MobileWarning showPopup={showPopup} closePopup={()=>{setShowPopup(false)}}/>
      <LivepeerConfig client={client}>
      <WagmiConfig client={wagmiClient}><XmtpContextProvider> 
<RainbowKitProvider chains={chains}  coolMode    theme={darkTheme({
        accentColor: 'linear-gradient(91.44deg, #D800A8 17.68%, #FF007A 88.87%)',
        accentColorForeground: 'white',
        borderRadius: 'medium',
        fontStack: 'system',
      })}
> 
  <Component {...pageProps} />

</RainbowKitProvider>
</XmtpContextProvider></WagmiConfig>
            
        
        </LivepeerConfig>
      </main>

    </div>
  );
}

export default MyApp;
