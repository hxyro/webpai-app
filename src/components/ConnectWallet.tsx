import { useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//@ts-ignore
import MetaMaskLogo from '../assets/metamask.svg'
interface Props {
  element: React.ReactElement
}

const ConnectWallet: React.FC<Props> = ({ element }) => {
  const [connectQuery, connect] = useConnect()
  const [accountQuery] = useAccount()

  useEffect(() => {
    if (!window.ethereum) {
      toast.error('Wallet Not Found', {
        theme: 'dark',
        position: 'bottom-right',
      })
    } else if (!accountQuery.data?.address) {
      toast.error('Wallet Not Connected', {
        theme: 'dark',
        position: 'bottom-right',
      })
    } else if (accountQuery.data?.address) {
      toast.success('Wallet Connected', {
        theme: 'dark',
        position: 'bottom-right',
      })
    }
  }, [accountQuery.data?.address])

  async function connectRequest() {
    await connect(connectQuery.data.connectors[0])
  }

  if (connectQuery.error?.name === 'ConnectorNotFoundError') {
    return (
      <div>
        <div className='connect-wallet'>
          <div className='logo-container'>
            <img
              alt='Metamask logo'
              className='meta-mask-logo'
              src={MetaMaskLogo}
            />
          </div>
          <div className='ring'>
            <div className='outer-ring center'></div>
            <div className='inner-ring center'></div>
          </div>
          <div>
            <a href={`https://metamask.io/`}>
              <button className='meta-mask-button'>Get Metamask</button>
            </a>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  } else if (!window.ethereum) {
    return (
      <div>
        <div className='connect-wallet'>
          <div className='logo-container'>
            <img
              alt='Metamask logo'
              className='meta-mask-logo'
              src={MetaMaskLogo}
            />
          </div>
          <div className='ring'>
            <div className='outer-ring center'></div>
            <div className='inner-ring center'></div>
          </div>
          <div>
            <a href={`https://metamask.io/`}>
              <button className='meta-mask-button'>Get Metamask</button>
            </a>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  } else if (!accountQuery.data?.address) {
    return (
      <div>
        <div className='connect-wallet'>
          <div className='logo-container'>
            <img
              alt='Metamask logo'
              className='meta-mask-logo'
              src={MetaMaskLogo}
            />
          </div>
          <div className='ring'>
            <div className='outer-ring center'></div>
            <div className='inner-ring center'></div>
          </div>
          <div>
            <button
              onClick={() => {
                connectRequest()
              }}
              className='meta-mask-button'
            >
              Connect Metamask
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  }
  return <div className='connected-page'>{element}</div>
}

export default ConnectWallet
