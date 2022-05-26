import { useState, useEffect } from 'react'
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
  const [message, setMessage] = useState('')
  const [ipfsid, setIpfsid] = useState('')
  const mutation = useAddMessage()
  const [accountQuery] = useAccount()
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [])

  return (
    <div className='editor-container'>
      <div>
        <img
          className='user-avatar'
          alt={accountQuery.data?.address}
          src={`https://avatars.dicebear.com/api/bottts/${accountQuery.data?.address}.svg`}
        />
      </div>
      <div className='editor'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutation.mutateAsync({ topic, message, ipfsid }).then(() => {
              setMessage('')
              setIpfsid('')
            })
          }}
        >
          <div className='user-name'>
            <p>
              {truncateMiddle(
                accountQuery.data?.address || constants.AddressZero || '',
                5,
                3,
                '...'
              )}
            </p>
          </div>
          <div className='main-textarea'>
            <textarea
              placeholder='Write a message..'
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          {toggle ? (
            <div className='main-textarea'>
              <textarea
                placeholder='Ipfs cid....'
                value={ipfsid}
                //@ts-ignore
                maxLength='59'
                onChange={(e) => setIpfsid(e.target.value)}
              ></textarea>
            </div>
          ) : (
            <></>
          )}
          <div className='send-button-container'>
            <button
              type='button'
              className='send-button2'
              onClick={() => setToggle(!toggle)}
            >
              +
            </button>
            <button className='send-button' type='submit'>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MessageEditor
