import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { initInitData, initNavigator, retrieveLaunchParams, useLaunchParams, useMiniApp, useThemeParams, useViewport } from '@telegram-apps/sdk-react';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { signAndSend, signAndSendMock } from './sign';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { Avatar, Button, Cell, List, Navigation, Placeholder, Section, Text, Title } from '@telegram-apps/telegram-ui';

function Login() {
  return (
    <Placeholder
      className='ton-connect-page__placeholder'
      header='TON Connect'
      description={
        <List>
          <Text>
            To display the data related to the TON Connect, it is required to connect your wallet
          </Text>
          <TonConnectButton className='ton-connect-page__button' />
        </List>
      }
    />
  );
}

function App() {
  const wallet = useTonWallet();

  const dataParams = new URLSearchParams(window.location.search);
  const miniApp = useMiniApp();

  const cmd = [
    BigInt(dataParams.get("data0")!),
    BigInt(dataParams.get("data1")!),
    BigInt(dataParams.get("data2")!),
    BigInt(dataParams.get("data3")!),
  ];

  const [tonConnectUI] = useTonConnectUI();

  const signAndSendBot = async () => {
    const jobid = await signAndSendMock(cmd, tonConnectUI);
    miniApp.sendData(String(jobid));
  }

  if (!wallet) {
    return <Login />;
  }

  const {
    account: { chain, publicKey, address },
    device: {
      appName,
      appVersion,
      maxProtocolVersion,
      platform,
      features,
    },
  } = wallet;

  return (
    <List>
      <Cell
        after={<TonConnectButton className='ton-connect-page__button-connected' />}
      >
        <Title level='3'>{appName}</Title>
      </Cell>
      <div className="HIJtihMA8FHczS02iWF5">
        <Placeholder
          action={<Button size="l" stretched onClick={signAndSendBot}>Signature</Button>}
          description={cmd.toString()}
          header="Signature"
        >
          <img
            alt="Telegram sticker"
            className="blt0jZBzpxuR4oDhJc8s"
            src="https://xelene.me/telegram.gif"
            width={100}
            height={100}
          />
        </Placeholder>
      </div>
    </List>
  )
}

export default App
