import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Thread from './components/Thread'
import Home from './components/Home'
import ConnectWallet from './components/ConnectWallet'
import { Provider as WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query'
import { providers } from 'ethers'

const provider = providers.getDefaultProvider('https://polygon-rpc.com')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      console.error(
        'Network Error: Ensure MetaMask is connected to the same network that your contract is deployed to.'
      )
    },
  }),
})

function App() {
  return (
    <WagmiProvider autoConnect provider={provider}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/thread/:id'
              element={<ConnectWallet element={<Thread />} />}
            />
            <Route path='/' element={<ConnectWallet element={<Home />} />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
