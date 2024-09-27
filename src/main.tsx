import { FC, StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@telegram-apps/telegram-ui/dist/styles.css';
import { SDKProvider } from '@telegram-apps/sdk-react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { AppRoot } from '@telegram-apps/telegram-ui'

const Inner: FC = () => {
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  return (
    <AppRoot>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <SDKProvider acceptCustomStyles>
          <App />
        </SDKProvider>
      </TonConnectUIProvider>
    </AppRoot>
  );
};

createRoot(document.getElementById('root')!).render(
  <Inner />
)
