import Head from "next/head";
import Login from "../components/Onboard";
import { useRouter } from "next/router";




export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>CrossMeet</title>
        <meta name="description" content="web3 native events!!" />
        <link rel="icon" href="/logoimg.png" />
      </Head>

      <main>
       <Login/>
      </main>
    </div>
  );
}
