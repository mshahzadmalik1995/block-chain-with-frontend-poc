import Moralis from "moralis";

const api_key = process.env.NEXT_PUBLIC_MORALIS_API_KEY;

/*const runApp = async () => {
    await Moralis.start({
      apiKey: api_key,
      // ...and any other configuration
    });
    console.log("server start successfully!");
}

runApp();*/

export default async function startServer(req, res) {
    await Moralis.start({
        apiKey: api_key
      })
      
    console.log("server start successfully")
    res.status(200).json("server started");
}

/*Moralis.start({
    apiKey: api_key
})*/