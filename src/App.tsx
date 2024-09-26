import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ethers } from 'ethers';
import { initInitData, initNavigator, retrieveLaunchParams, useLaunchParams, useMiniApp, useThemeParams, useViewport } from '@telegram-apps/sdk-react';
import { Router } from 'react-router-dom';
import { MetaMaskButton, useAccount, useSDK, useSignMessage } from '@metamask/sdk-react-ui';

function AppReady() {
  const {
    data: signData,
    isError: isSignError,
    isLoading: isSignLoading,
    isSuccess: isSignSuccess,
    signMessage,
  } = useSignMessage({
    message: "gm wagmi frens",
  })

  const { isConnected } = useAccount()

  return (
    <div className="App">
      <header className="App-header">
        <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
        {isConnected && (
          <>
            <div style={{ marginTop: 20 }}>
              <button disabled={isSignLoading} onClick={() => signMessage()}>
                Sign message
              </button>
              {isSignSuccess && <div>Signature: {signData}</div>}
              {isSignError && <div>Error signing message</div>}
            </div>
          </>
        )}
      </header>
    </div>
  )
}

function App() {
  const { ready } = useSDK();
  // const launchParams = useLaunchParams();
  // const dataParams = new URLSearchParams(window.location.search);
  // const { connect, accounts } = useMetaMask();
  // const params = JSON.stringify(launchParams, null, 2);
  // const miniApp = useMiniApp();
  // const themeParams = useThemeParams();
  // const viewport = useViewport();

  // const [count, setCount] = useState(0)
  // const [account, setAccount] = useState(null);
  // const [provider, setProvider] = useState(null);
  // const [connected, setConnected] = useState(false);

  // const connect = async () => {
  //   try {
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const accounts = await provider.send("eth_requestAccounts", []);
  //     const account = accounts[0];
  //     setProvider(provider);
  //     setAccount(account);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const data0 = dataParams.get("data0");
  // const data1 = dataParams.get("data1");
  // const data2 = dataParams.get("data2");
  // const data3 = dataParams.get("data3");

  // // useEffect(() => {
  // const initializeProvider = async () => {
  //   if (window.ethereum) {
  //     await window.ethereum.request({ method: 'eth_requestAccounts' });
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     setProvider(provider);
  //   }
  // };

  // initializeProvider();
  //  }, []);

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //     <button onClick={connect}>connect
  //     </button>
  //     <h1>{account}</h1>
  //   </>
  // )

  //      <div>{window.location.search}</div>


  // async function connectWallet() {
  //   console.log(window.ethereum);
  //   if (!connected) {
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);
  //     const signer = await provider.getSigner();
  //     // const signer = await provider.getSigner();
  //     // const _walletAddress = await signer.getAddress();
  //     setConnected(true);
  //     //setWalletAddress(_walletAddress);
  //   }
  // }

  //       // <div>{params}</div>

  if (!ready) {
    return <div>Loading...</div>
  }

  return <AppReady />

  // return (
  //   <p>
  //     <div>{dataParams.get("data0")}</div>
  //     <div>{dataParams.get("data1")}</div>
  //     <div>{dataParams.get("data2")}</div>
  //     <div>{dataParams.get("data3")}</div>
  //     <div>hehe</div>
  //     <div>{connected ? "connected" : "disconnected"}</div>
  //     <button onClick={connectWallet}>Connect!</button>
  //   </p>
  // )
}

export default App
