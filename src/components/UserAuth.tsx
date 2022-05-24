import * as React from 'react'
import { useAccount, useConnect } from 'wagmi'
import toast from 'react-hot-toast'

const AuthButton: React.FunctionComponent = (props) => {
  const [connectQuery, connect] = useConnect()
  const [accountQuery] = useAccount()

  React.useEffect(() => {
    if (connectQuery.error?.name === 'ConnectorNotFoundError') {
      toast.error('MetaMask extension required to sign in')
    }
  }, [connectQuery.error])

  if (!accountQuery.data?.address) {
    return (
      <button
        onClick={() => {
          connect(connectQuery.data.connectors[0])
        }}
      ></button>
    )
  }
  return <button>{props.children}</button>
}

export default AuthButton
