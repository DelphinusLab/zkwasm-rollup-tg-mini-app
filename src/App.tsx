import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { initInitData, initNavigator, retrieveLaunchParams, useLaunchParams, useMiniApp, useThemeParams, useViewport } from '@telegram-apps/sdk-react';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { signAndSend, signAndSendMock } from './sign';

function Login() {
  return (
    <TonConnectButton />
  );
}

function App() {
  const [walletConnected, setWalletConnected] = useState(false);

  const dataParams = new URLSearchParams(window.location.search);
  const miniApp = useMiniApp();

  const cmd = [
    BigInt(dataParams.get("data0")!),
    BigInt(dataParams.get("data1")!),
    BigInt(dataParams.get("data2")!),
    BigInt(dataParams.get("data3")!),
  ];

  const [tonConnectUI] = useTonConnectUI();
  tonConnectUI.onStatusChange(wallet => {
    setWalletConnected(wallet != null);
  }
  );

  const signAndSendBot = async () => {
    const jobid = await signAndSendMock(cmd, tonConnectUI);
    miniApp.sendData(String(jobid));
  }

  return <div>
    <Login />
    {walletConnected &&
      <div>
        <h2>
          Sign message {cmd.toString()}
        </h2>
        <button onClick={signAndSendBot}>sign</button>
      </div>}
  </div>
}

export default App
