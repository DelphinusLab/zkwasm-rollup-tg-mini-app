import { createAppKit } from '@reown/appkit/react'
import { FC, StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@telegram-apps/telegram-ui/dist/styles.css';
import { SDKProvider } from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

const projectId = '705d25e3ce550a550d0fd61372186d9d'
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://sad-buses-shake.loca.lt/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
};
const networks = [mainnet, arbitrum]
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})


const Inner: FC = () => {
  return (
    <AppRoot>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <SDKProvider acceptCustomStyles>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </SDKProvider>
      </WagmiProvider>
    </AppRoot>
  );
};

createRoot(document.getElementById('root')!).render(
  <Inner />
)
