import { useAddress, useChainId } from "@thirdweb-dev/react";
import axios from "axios";
import Card from "./card";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function getNfts() {
    const [nfts, setNfts] = useState([]);
    const address = useAddress()
    const chain = useChainId();
    const router = useRouter()
    console.log(`address ${address} chain ${chain}`)

    useEffect(() => {
        let response;
        async function getData() {
            response = await axios.get(`http://localhost:3000/api/hello`, {
                params: {address, chain}
            })
            .then((response) => {
                setNfts(response.data[0].result);
                console.log(response.data[0].result);
            })
        }
        getData();
    },[])

    return(
        <div className="flex flex-col">
            <div className="flex flex-row flex-wrap">
                {nfts && nfts.map((nft, index) => {
                    return  <Card uri={nft} key={index} />
                })}
            </div>
            <div className="flex text-center m-4">
                <button className="p-2 bg-sky-500 rounded-full w-20 disabled:bg-sky-100"
                    onClick={() => router.back()}>Back</button>
            </div>
        </div>
    )
}