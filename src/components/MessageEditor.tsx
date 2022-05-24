import * as React from 'react'
import { constants } from 'ethers'
import { useAccount, useConnect } from 'wagmi'
import toast from 'react-hot-toast'
import useAddMessage from '../hooks/useAddMessage'
import truncateMiddle from 'truncate-middle'

interface MessageEditorProps {
  topic: string
}

const MessageEditor: React.FunctionComponent<MessageEditorProps> = ({
  topic,
}) => {
  const [message, setMessage] = React.useState('')
  const [ipfsid, setIpfsid] = React.useState('')
  const mutation = useAddMessage()
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
      >
        Sign in{' '}
      </button>
    )
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          mutation.mutateAsync({ topic, message, ipfsid }).then(() => {
            setMessage('')
            setIpfsid('')
          })
        }}
      >
        <br></br>
        <br></br>
        <br></br>
        <label>
          {truncateMiddle(
            accountQuery.data?.address || constants.AddressZero || '',
            5,
            2,
            '..'
          )}
        </label>
        <br></br>
        <textarea
          placeholder='Write a message..'
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <textarea
          placeholder='Ipfs cid....'
          required
          value={ipfsid}
          onChange={(e) => setIpfsid(e.target.value)}
        ></textarea>
        <br></br>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default MessageEditor
