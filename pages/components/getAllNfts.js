import { useAddress, useChainId } from "@thirdweb-dev/react";
import axios from "axios";
import Card from "./card";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HaircutNft from '../haircutNft.json';
import ProductNft from '../productNft.json';
import ShampooNft from '../shampooNft.json';

export default function getAllNfts() {
    const [nfts, setNfts] = useState([]);
    const chain = useChainId();
    const router = useRouter()
    useEffect(() => {
        let response;
        async function getData(address, chain) {
            console.log(`address ${address}`)
            response = await axios.get(`http://localhost:3000/api/nftwithcollection`, {
                params: {address, chain}
            })
            .then((response) => {
                console.log(response.data[0].result);
                if(response.data[0].result != "undefined" && response.data[0].result != null && response.data[0].result.length > 0){
                    setNfts(response.data[0].result);
                }
            })
        }
         getData(HaircutNft.address, chain);
        // getData(ProductNft.address, chain);
        // getData(ShampooNft.address, chain);
    },[])
    
    return(
            <div className="flex flex-col">
                <div className="flex text-center m-4">
                    <button className="p-2 bg-sky-500 rounded-full w-20 disabled:bg-sky-100"
                        onClick={() => router.back()}>Back</button>
                </div>
                <div className="flex flex-row flex-wrap">
                    {nfts && nfts.map((nft, index) => {
                        return  <Card nftData={nft} key={index} />
                    })}
                </div>
            </div>
        )
}