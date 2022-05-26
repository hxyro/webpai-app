import * as React from 'react'
import useMessages from '../hooks/useMessage'
import Message from './Message'
import MessageEditor from './MessageEditor'
import useEvents from '../hooks/useEvents'

interface MessageProps {
  topic: string
}

const ChatHistory: React.FunctionComponent<MessageProps> = ({ topic }) => {
  const query = useMessages({ topic })
  useEvents({ topic })
  return (
    <div className='chat-container'>
      {query.isLoading && <h2>Loading......</h2>}
      <div>
        {query.data?.map((i) => (
          <div>
            <Message key={i.id} message={i} />
          </div>
        ))}
      </div>
      <div className='editor-container'>
        {query.isFetched && <MessageEditor topic={topic} />}
      </div>
    </div>
  )
}

export default ChatHistory
/*
      {query.data?.map((i) => (
        <div key={i.id}>
          <h1>{i.topic}</h1>
          <h2>{i.message}</h2>
          <div>
            <img src={`https://${i.ipfsid}.ipfs.dweb.link`} alt={i.topic} />
          </div>
        </div>
      ))} */
