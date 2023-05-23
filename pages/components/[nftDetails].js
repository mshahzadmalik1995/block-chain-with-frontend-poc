import Navbar from "./navbar";
import MarketplaceNftAddress from '../marketplaceNftAddress.json';
import axios from "axios"
import {useState} from 'react';
import { ethers } from "ethers";
import HairCutNft from '../haircutNft.json';
import { GetIpfsUrlFromPinata } from "../../utils/utils";
import { useParams } from 'next/navigation';
import { useRouter } from "next/router";

export default function NFTDetails (props) {
    const [data, updateData] = useState({});
    const [dataFetched, updateDataFetched] = useState(false);
    const [message, updateMessage] = useState("")
    const [currAddress, updateCurrAddress] = useState("0x");
    const [updatePrice, setUpdatePrice] = useState();
    const router = useRouter()
    const tokenId = router.query.nftDetails;
    const {mid} = router.query;

    async function getNFTData(mid) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        //console.log(`address ${addr}`)
        let contract = new ethers.Contract(MarketplaceNftAddress.address, MarketplaceNftAddress.abi, signer);
        const listedToken = await contract.getMarketItem(mid);

        
            
        let hairCutContract = new ethers.Contract(listedToken.nftAddress, HairCutNft.abi, signer);
        var tokenURI = await hairCutContract.tokenURI(tokenId);
        
       // console.log(`The TokenURI is ${tokenURI}`)

        const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            const tokenURIResponse = await axios.get(requestURL);
            const imageURI = tokenURIResponse.data.image
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            let price = ethers.utils.formatUnits(listedToken.listPrice.toString(), 'ether');
            let item = {
                price, 
                tokenId: listedToken.tokenId.toNumber(),
                seller: listedToken.seller,
                owner: listedToken.owner,
                image: imageURIURL,
                name: tokenURIResponse.data.name,
                description: tokenURIResponse.data.description,
                nftAddress: listedToken.nftAddress,
                marketplaceId : listedToken.marketplaceId.toNumber()
        }
        updateData(item);
        updateDataFetched(true);
        updateCurrAddress(addr);
    }

    async function buyNFT(mid) {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(MarketplaceNftAddress.address, MarketplaceNftAddress.abi, signer);
            const salePrice = ethers.utils.parseUnits(data.price, 'ether');
            updateMessage("Buying the NFT... Please wait (upto 5 mins)");
            let transaction = await contract.buyListing(mid, data.nftAddress, {value: salePrice});
            await transaction.wait()
            alert("You successfully bought the NFT!!!");
            updateMessage("")
        } catch(e) {
            alert("upload error : "+e);
        }
    }

    async function updateNftPrice() {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(MarketplaceNftAddress.address, MarketplaceNftAddress.abi, signer);
            const salePrice = ethers.utils.parseUnits(updatePrice, 'ether');
            let transaction = await contract.updateListingPrice(data.nftAddress, tokenId, mid,   salePrice);
            await transaction.wait()
            alert("You successfully update the price NFT!!!");

        } catch(e) {
            alert("upload error : "+e);
        }
    }

    
    if(!dataFetched){
        getNFTData(mid);
    }

    return(
        <div style={{"min-height":"100vh"}}>
            <Navbar />
            <div className="flex ml-20 mt-20">
                <img src={data.image} alt="" className="w-2/5 rounded-lg" />
                <div className="text-xl ml-20 space-y-8 shadow-2xl rounded-lg border-2 p-5">
                    <div>
                        Name: {data.name}
                    </div>
                    <div>
                        Description: {data.description}
                    </div>
                    <div>
                        Price: <span className="">{data.price + " ETH"}</span>
                    </div>
                    <div>
                        Owner: <span className="text-sm">{data.owner}</span>
                    </div>
                    <div>
                        Seller: <span className="text-sm">{data.seller}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                    { currAddress != data.owner && currAddress != data.seller ?
                        <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(mid)}>Buy this NFT</button>
                        : 
                            <div className="flex flex-col gap-1">
                                <div className="text-emerald-700">You are the owner of this NFT</div>
                                {/*<div className="mb-4">
                                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">Update Price</label>
                                    <input className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="updatePrice" type="text" value={updatePrice} onChange={e => setUpdatePrice(e.target.value)} placeholder="UpdatePrice"></input>
                                </div>
                                <button className="p-1 bg-sky-500 rounded-sm w-20 disabled:bg-sky-100"
                    onClick={updateNftPrice}>Update</button> */}
                            </div>
                        
                        }
                        
                    <button className="p-2 bg-sky-500 rounded-full w-20 disabled:bg-sky-100"
                        onClick={() => router.back()}>Back</button>
                    
                    <div className="text-green text-center mt-3">{message}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}