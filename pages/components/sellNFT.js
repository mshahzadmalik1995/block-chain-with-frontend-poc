import {useState} from "react";
import { ethers } from "ethers";
import MarketplaceNftAddress from '../marketplaceNftAddress.json'
import HairCutNft from '../haircutNft.json';
import {storeImages, storeTokenUriMetadata, uploadFileToIPFS, uploadJSONToIPFS} from '../../utils/uploadToPinata'
import Navbar from "./navbar";

export default function SellNFT() {
    
    const [formParams, updateFormParams] = useState({address:'', tokenId: '', price: ''})

    async function uploadNft(e) {
        e.preventDefault();
        try{
            const {address, tokenId, price} = formParams;
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            //updateMessage("Uploading NFT (may takes 5 mins).... please don't click anything!!! ")
            let hairCutContract = new ethers.Contract(address, HairCutNft.abi, signer);
            let contract = new ethers.Contract(MarketplaceNftAddress.address, MarketplaceNftAddress.abi, signer);
            let formatPrice  = ethers.utils.parseUnits(formParams.price, 'ether');
            let listingPrice = formatPrice
            listingPrice = listingPrice.toString()
            let transactionApprove = await hairCutContract.approve(MarketplaceNftAddress.address, tokenId);
            await transactionApprove.wait();
            console.log(transactionApprove)
            let transaction = await contract.createListing(tokenId, address, formatPrice);
            await transaction.wait()
            alert("Successfully listed your NFT!!!");
           // updateMessage("")
            updateFormParams({address: '', tokenId: '', price: ''})
        } catch(ex) {
            console.log(`ex ${ex}`);
            alert("error "+ex);
        }
    }
    return (
        <div>
            <Navbar/>
            <div className="flex flex-col place-items-center mt-10" id="nftForm">
                <form className="bg-red-100 shadow-md rounded px-8 pt-4 pb-8 mb-4">
                    <h3 className="text-center font-bold text-purple-500 mb-8">Upload your NFT to the Marketplace</h3>
                    <div className="mb-4">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Address</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, address: e.target.value})} value={formParams.address}></input>
                    </div>
                    <div className="mb-4">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT TokenId</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tokenId" type="number" placeholder="Axie#4563" onChange={e => updateFormParams({...formParams, tokenId: e.target.value})} value={formParams.tokenId}></input>
                    </div>
                    <div className="mb-6">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Price (in ETH)</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
                    </div>
                    <br></br>
                   {/* <div className="text-red-500 text-center">{message}</div> */}
                    <button onClick={uploadNft} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg" id="list-button">list</button>
                </form>
            </div>
        </div>
    )
}