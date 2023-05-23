import { ethers } from "ethers";
import { useState } from "react";
import MarketplaceNft from '../marketplaceNft.json'
import MarketplaceNftAddress from '../marketplaceNftAddress.json'
//import hi from '../marketplaceNftAddress.json'
import HairCutNft from '../haircutNft.json';
import { GetIpfsUrlFromPinata } from "../../utils/utils";
import Navbar from "./navbar";
import NFTTile from "./nfttile";
import axios from "axios";

export default function Marketplace() {

    
const sampleData = [
    {
        "name": "NFT#1",
        "description": "Alchemy's First NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "NFT#2",
        "description": "Alchemy's Second NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "NFT#3",
        "description": "Alchemy's Third NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
];


const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);


    async function getAllNFTs() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        let contract = new ethers.Contract(MarketplaceNftAddress.address, MarketplaceNftAddress.abi, signer);
        let transaction = await contract.getAllNFTs();
        let checkhairCut = true;
        console.log(`transaction ${transaction}`);

        
        const items = await Promise.all(transaction.map(async i => {
            
            try{
            let hairCutContract = new ethers.Contract(i.nftAddress, HairCutNft.abi, signer);
            console.log(`i.nftAddress ${i.nftAddress}`)
            var tokenURI = await hairCutContract.tokenURI(i.tokenId);
            
            console.log(`The TokenURI is ${tokenURI}`)
           // tokenURI = GetIpfsUrlFromPinata(tokenURI);

            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
                //const tokenURIResponse = await (await fetch(requestURL)).json()
                const tokenURIResponse = await axios.get(requestURL);
                console.log(`tokenURIResponse ${JSON.stringify(tokenURIResponse)}`)
                console.log(`tokenURIResponse ${tokenURIResponse.data}`)
                const imageURI = tokenURIResponse.data.image
                console.log(`imageURI ${imageURI}`);
                const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
                console.log(`imageURIURL ${imageURIURL}`)
                //let meta = await axios.get(tokenURI)
                //meta = meta.data;
                let price = ethers.utils.formatUnits(i.listPrice.toString(), 'ether');
                let item = {
                    price, 
                    tokenId: i.tokenId.toNumber(),
                    seller: i.seller,
                    owner: i.owner,
                    image: imageURIURL,
                    name: tokenURIResponse.data.name,
                    description: tokenURIResponse.data.description,
                    marketplaceId : i.marketplaceId.toNumber()
            }
            return item

        } catch(ex) {
            console.log(`ex in mp ${ex}`)
        }
        }))
        
        console.log(items)
        updateFetched(true)
        updateData(items)
    }

    

if(!dataFetched){
    getAllNFTs()
}

    return(
        <div>
            <Navbar/>
            <div className="flex flex-col place-items-center mt-3">
                <div className="md:text-xl font-bold text-white">
                    NFTs
                </div>
                <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                    {data?.map((value, index) =>{
                        return  <NFTTile data={value} key={index} />
                    })}
                </div>
            </div>
        </div>
    )
}