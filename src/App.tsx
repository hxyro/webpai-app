import React from 'react'
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query'
import { Provider as WagmiProvider } from 'wagmi'
import { providers } from 'ethers'
import ChatHistory from './components/ChatHistory'

const provider = providers.getDefaultProvider('http://localhost:8545')

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
        <ChatHistory topic='hello' />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
