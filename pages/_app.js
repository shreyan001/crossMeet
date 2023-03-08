import "../styles/globals.css";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { bscTestnet } from "wagmi/chains";

export default function App({ Component, pageProps }) {
  const { chains, provider, webSocketProvider } = configureChains(
    [bscTestnet],
    [publicProvider()]
  );

  const client = createClient({
    autoConnect: true,
    provider,
  });

  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
