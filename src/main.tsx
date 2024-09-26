import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SDKProvider } from '@telegram-apps/sdk-react'
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui'

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <MetaMaskUIProvider sdkOptions={{
    dappMetadata: {
      name: "Example React Dapp",
      url: window.location.href,
    },
  }}>
    <SDKProvider acceptCustomStyles>
      <App />
    </SDKProvider>
  </MetaMaskUIProvider >
  //</StrictMode>,
)
