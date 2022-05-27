import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ChatHistory from './ChatHistory'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//@ts-ignore
import polygonLogo from '../assets/polygonlogo.png'

const Thread = () => {
  const [chainId, setChainId] = useState(true)
  const ethereum: any = window.ethereum
  useEffect(() => {
    const getChainId = async () => {
      if (ethereum) {
        const cid = await ethereum.request({ method: 'eth_chainId' })
        if (cid === '0x89') {
          setChainId(false)
        } else {
          toast.error('Switch to polygon mainnet', {
            theme: 'dark',
            position: 'bottom-right',
          })
        }
      }
    }
    getChainId()
  }, [ethereum])

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
        {chainId ? (
          <button
            className='switch'
            onClick={() => {
              Network()
              window.location.reload()
            }}
          >
            <img alt='Network logo' src={polygonLogo} /> switch
          </button>
        ) : (
          <></>
        )}
      </div>
      <ChatHistory topic={id || 'main'} />
      <ToastContainer />
    </div>
  )
}

export default Thread
