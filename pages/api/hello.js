// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import clientPromise from "@/lib/mongodb"
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
/*export default async function handler(req, res) {
  const dbClient = await clientPromise;
  const db = dbClient.db('mypoc1');
  //console.log(db)
  res.status(200).json({ name: 'John Doe' })
}*/

//const api_key = process.env.NEXT_PUBLIC_MORALIS_API_KEY;


export default async function runApp(req, res) {
 // console.log(api_key);
  /*await Moralis.start({
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImNhMzliZDgzLThmNjEtNDA3Ny04Y2RmLTI3NWZmZDkzMGJjMiIsIm9yZ0lkIjoiMzIyNTI0IiwidXNlcklkIjoiMzMxNTc1IiwidHlwZUlkIjoiNDFhZmRiY2EtZGYxOS00YjcwLWJiYTktZTUwYTlkZWEyZDhhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODQzMjYzMjUsImV4cCI6NDg0MDA4NjMyNX0.xfTEFaQ0eAKbCZ2InK09g9flv0hy3Tcyh-JGlORqF3o"
  }); */
  /*await Moralis.start({
    apiKey: api_key
  })*/
  const allNFTs = [];
  const {query} = req;
  //const address = "0x352d0ecB3E9E9c9A7D51e6Ad0DA7fAd5564FF621";
 // const chains = [EvmChain.SEPOLIA, EvmChain.ETHEREUM];
 //const chain = "11155111";
 const address = query.address;
  const chain = query.chain;
  console.log(`address ${address} chain : ${chain}`);
  try{
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
      });
      allNFTs.push(response);
  //  console.log(allNFTs);
    res.status(200).json(allNFTs)

  } catch(e) {
    console.log(`Something went wrong ${e}`);
    res.status(400).json();
  }
}

/*await Moralis.start({
  apiKey: api_key
}).then(() => {

});*/

/*Moralis.start({
  apiKey: api_key
});*/
