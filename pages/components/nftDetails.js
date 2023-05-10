import Navbar from "./navbar";
import MarketplaceNft from '../marketplaceNft.json';
import axios from "axios"
import {useState} from 'react';
import { ethers } from "ethers";
import { GetIpfsUrlFromPinata } from "../../utils/utils";
import { useParams } from 'next/navigation';
import { useRouter } from "next/router";

export default function NFTDetails (props) {
    const [data, updateData] = useState({});
    const [dataFetched, updateDataFetched] = useState(false);
    const [message, updateMessage] = useState("")
    const [currAddress, updateCurrAddress] = useState("0x");
    const router = useRouter()
    //const params = useParams()
    console.log(router.query.tokenId)
    const tokenId = router.query.tokenId;
    //const tokenId = params.tokenId;

    async function getNFTData(tokenId) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        let contract = new ethers.Contract(MarketplaceNft.address, MarketplaceNft.abi, signer);
        var tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        console.log(`listedToken ${listedToken}`);
        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description
        }
        updateData(item);
        updateDataFetched(true);
        updateCurrAddress(addr);
    }
    async function buyNFT(tokenId){
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            let contract = new ethers.Contract(MarketplaceNft.address, MarketplaceNft.abi, signer);
            const salePrice = ethers.utils.parseUnits(data.price, 'ether');
            updateMessage("Buying the NFT... Please wait (upto 5 mins)");
            let transaction = await contract.executeSale(tokenId, {value: salePrice});
            await transaction.wait()
            alert("You successfully bought the NFT!!!");
            updateMessage("")
        } catch(e) {
            alert("upload error : "+e);
        }
    }
    if(!dataFetched){
        getNFTData(tokenId);
    }
    if(typeof data.image == "string"){
        data.image = GetIpfsUrlFromPinata(data.image);
    }

    

    return(
        <div style={{"min-height":"100vh"}}>
            <Navbar />
            <div className="flex ml-20 mt-20">
                <img src={data.image} alt="" className="w-2/5" />
                <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
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
                    <div>
                    { currAddress != data.owner && currAddress != data.seller ?
                        <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
                        : <div className="text-emerald-700">You are the owner of this NFT</div>
                    }
                    
                    <div className="text-green text-center mt-3">{message}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}