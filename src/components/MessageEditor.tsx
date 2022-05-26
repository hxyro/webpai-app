import * as React from 'react'
import { constants } from 'ethers'
import { useAccount } from 'wagmi'
import 'react-toastify/dist/ReactToastify.css'
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
  const [accountQuery] = useAccount()

  return (
    <div className='editor'>
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
          <label>
            {truncateMiddle(
              accountQuery.data?.address || constants.AddressZero || '',
              5,
              2,
              '..'
            )}
          </label>
          <br></br>
          <div>
            <textarea
              placeholder='Write a message..'
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <textarea
              placeholder='Ipfs cid....'
              required
              value={ipfsid}
              onChange={(e) => setIpfsid(e.target.value)}
            ></textarea>
          </div>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default MessageEditor
