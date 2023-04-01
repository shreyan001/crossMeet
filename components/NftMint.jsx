import { useState, useContext } from 'react';
import { ethers } from 'ethers';
import { nftABI } from '../abi/nftABI'; // Replace with your contract ABI
; // Replace with your contract address
import { AuthContext } from "../context/auth";


export function MintNFTButton() {
const { connectWallet, checkNetwork } = useContext(AuthContext);


const contract = '0xa0ac35347655943eb3355d49ae28d071da42858a';




    const [minting, setMinting] = useState(false);
  
    async function handleMintNFT() {
      setMinting(true);
  
      try {

        const provider = await connectWallet();

        const nftContract = new ethers.Contract(contract, nftABI, signer);

			/* Check if the network is the correct one */
			await checkNetwork(provider);

			/* Get the signer from the provider */
			const signer = provider.getSigner();

        // Call the mint function on your contract
        const result = await nftContract.mintNFT();
  
        // Wait for the transaction to be confirmed
        await result.wait();
  
        alert('NFT minted successfully!');
      } catch (error) {
        console.error(error);
        alert('An error occurred while minting the NFT.');
      }
  
      setMinting(false);
    }
  
    return (
      <button  className='button1' onClick={handleMintNFT} disabled={minting}>
        {minting ? 'Minting...' : 'Mint NFT'}
      </button>
    );
  }
