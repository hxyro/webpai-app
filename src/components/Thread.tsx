import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ChatHistory from './ChatHistory'
//@ts-ignore
import polygonLogo from '../assets/polygonlogo.png'

function Thread() {
  const { ethereum } = window

  const Network = async () => {
    if (ethereum) {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x89' }],
        })
      } catch (error: any) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x89',
                chainName: 'Polygon Mainnet',
                rpcUrls: ['https://polygon-rpc.com'],
                nativeCurrency: {
                  name: 'Matic',
                  symbol: 'MATIC',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://polygonscan.com'],
              },
            ],
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
  const { id } = useParams()
  return (
    <div>
      <div className='home-container'>
        <Link to='/'>
          <button className='home'>Home</button>
        </Link>
        <button className='switch' onClick={Network}>
          <img alt='Network logo' src={polygonLogo} /> switch
        </button>
      </div>
      <ChatHistory topic={id || 'main'} />
    </div>
  )
}

export default Thread
