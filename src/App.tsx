import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { initInitData, initNavigator, retrieveLaunchParams, useLaunchParams, useMiniApp, useThemeParams, useViewport } from '@telegram-apps/sdk-react';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { signAndSend, signAndSendMock } from './sign';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { Avatar, Button, Cell, List, Navigation, Placeholder, Section, Text, Title } from '@telegram-apps/telegram-ui';
import { useAppKit } from '@reown/appkit/react'
import { useAccount, useSignMessage } from 'wagmi';
import { SignMessageMutateAsync } from 'wagmi/query';


function ConnectButton() {
  return <w3m-button />
}

function App() {
  const dataParams = new URLSearchParams(window.location.search);
  const { signMessageAsync } = useSignMessage();
  const { address, isConnecting } = useAccount();

  const miniApp = useMiniApp();

  const cmd = [
    BigInt(dataParams.get("data0")!),
    BigInt(dataParams.get("data1")!),
    BigInt(dataParams.get("data2")!),
    BigInt(dataParams.get("data3")!),
  ];

  const signAndSendBot = async (cmd: Array<bigint>, signMessageAsync: SignMessageMutateAsync<any>) => {
    const jobid = await signAndSend(cmd, address!.toString(), signMessageAsync);
    miniApp.sendData(String(jobid));
  }

  return (
    <List>
      <ConnectButton />
      <Placeholder
        action={<Button size="l" stretched onClick={async () => { await signAndSendBot(cmd, signMessageAsync) }}>Signature</Button>}
        header="Sign"
        description="1,2,3,4"
      >
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
    </List>
  )
}

export default App
