import * as React from 'react'
import TimeAgo from 'react-timeago'
import { Message as Mm } from '../hooks/useManageMessage'
import truncateMiddle from 'truncate-middle'

interface MessageProps {
  message: Mm
}

const Message: React.FunctionComponent<MessageProps> = ({ message }) => {
  return (
    <div>
      ========================================================================
      <p>
        [user: {truncateMiddle(message.creator_address || '', 5, 2, '..')}]:
        {'  '}
        {message.message}
      </p>
      <div>[file: ]: {`https://${message.ipfsid}.ipfs.dweb.link`}</div>
      <div>
        <img
          src={`https://${message.ipfsid}.ipfs.dweb.link`}
          alt={message.id}
        />
      </div>
      <div>
        [Time: ]<TimeAgo date={message.created_at.toNumber() * 1000} />
      </div>
    </div>
  )
}

export default Message
