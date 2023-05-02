import '@/styles/globals.css'
import { ThirdwebProvider,ChainId } from '@thirdweb-dev/react'

const activeChain = "ethereum";

export default function App({ Component, pageProps }) {
  return   (
      <ThirdwebProvider activeChain="ethereum" autoConnect={false}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    );
}
