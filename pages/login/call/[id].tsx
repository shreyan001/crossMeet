import { useRouter } from "next/router";
import { Connect } from "../../../components/Connect";
import {Notifi} from "../../../components/NotifiCard";
import {DAppProvider, Mainnet, useEthers} from  '@usedapp/core';
import { useContext, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { PROFILES_BY_IDS } from "../../../graphQL";
import { PROFILES } from "../../../helpers/constants";
import ProfileCard from "../../../Cards/ProfileCard";
import { IProfileCard } from "../../../types";
import { AuthContext } from "../../../context/auth";
import Panel from "../../../components/Panel"
import { ToastContainer, toast, Slide } from 'react-toastify';
import {MintNFTButton} from "../../../components/NftMint"


export default function ProductPage() {
const { accessToken, address } = useContext(AuthContext);
	const [getProfilesByIDs] = useLazyQuery(PROFILES_BY_IDS);
	const [profiles, setProfiles] = useState<IProfileCard[]>([]);


  
	useEffect(() => {
		console.log("address", address);
		const getProfiles = async () => {
			const { data } = await getProfilesByIDs({
				variables: {
					profileIDs: [937],
					myAddress: address,
				},
			});
			setProfiles([...data.profilesByIDs]);
		};

		if (accessToken && address) {
			getProfiles();
		} 
	}, [accessToken, address, getProfilesByIDs]);
 const router = useRouter();
  const { id } = router.query;
  const [isOpen, setOpen] = useState(false);
  const ConnectButton = () => {
    const {account, deactivate,activateBrowserWallet} = useEthers()

    if (account){ return <button className="button1" onClick={()=>{deactivate()}}>disconnect</button>}
    else {return  <button className="button1"  onClick={()=>{activateBrowserWallet()}}>Connect</button>}
  }

  // Fetch data for the product with the specified ID using `id`

  const config ={
    readOnlyChainId: Mainnet.chainId
  }
  return (
<div className=" text-white">
  <div className="w-full h-fit flex flex-row items-center justify-around">
  <h1 className="text-3xl font-bold py-6">Community Call - {id}</h1>
 <div className="w-fit"> <Panel/></div></div>

  <div className="mt-20 bg-black2 w-fit mx-auto my-10 rounded-md">
    <h1 className="mx-10">get meet notifications</h1>
  <DAppProvider config={config}>
    <Notifi />
    <ConnectButton />
  </DAppProvider>
    </div>
  <div className="max-w-4xl mx-auto">
   
    <div className="flex flex-row gap-10 justify-between">
      <div className="w-full lg:w-2/3">
        <div className="bg-black2 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Subscribe to Organization</h2>
          <div className="profiles grid grid-cols-1 sm:grid-cols-2 gap-1">
            {profiles.length > 0 &&
              profiles.map((profile) => (
                <ProfileCard key={profile.profileID} {...profile} />
              ))}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3">
        <div className="bg-black2 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold text-white mb-4">Mint NFT?</h2>
          <div className="details">
         <MintNFTButton/>
          </div>
        </div>
        <button
          onClick={() => {
            router.push(`/call/${id}`);
          }}
          className="button1 w-full"
        >
          Enter
        </button>
      </div>
    </div>
  </div>


    
    </div>
  );
}