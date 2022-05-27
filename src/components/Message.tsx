import * as React from 'react'
import TimeAgo from 'react-timeago'
import { Message as Mm } from '../hooks/useManageMessage'
import truncateMiddle from 'truncate-middle'

interface MessageProps {
  message: Mm
}

const Message: React.FunctionComponent<MessageProps> = ({ message }) => {
  var arr: string[] = []
  const Pusharr = (i: string): void => {
    arr.push(i)
  }
  return (
    <div className='message-box'>
      <div>
        <img
          className='user-avatar'
          alt={message.ipfsid}
          src={`https://avatars.dicebear.com/api/bottts/${message.creator_address}.svg`}
        />
      </div>
      <div className='message-container'>
        <div className='user-name'>
          <p>{truncateMiddle(message.creator_address || '', 5, 3, '...')} </p>
          <span>
            <TimeAgo date={message.created_at.toNumber() * 1000} />
          </span>
        </div>
        {/* <p id='message'>{message.message}</p> */}
        <div id='message'>
          {message.message.split(' ').map((i) => (
            <span>
              {i.includes('https://') ? (
                <div key={i}>
                  <>
                    {!i.includes('tenor.com') ? (
                      i.endsWith('.jpg') ? (
                        Pusharr(i)
                      ) : i.endsWith('.png') ? (
                        Pusharr(i)
                      ) : i.endsWith('.jepg') ? (
                        Pusharr(i)
                      ) : i.endsWith('.svg') ? (
                        Pusharr(i)
                      ) : i.endsWith('.gif') ? (
                        Pusharr(i)
                      ) : i.endsWith('.webp') ? (
                        Pusharr(i)
                      ) : (
                        <span>
                          <a href={i}>
                            <p>{i} </p>
                          </a>
                        </span>
                      )
                    ) : (
                      <></>
                    )}
                  </>
                </div>
              ) : (
                <span>{i} </span>
              )}
            </span>
          ))}
        </div>
        <div className='embed-container'>
          {arr.map((i) => (
            <div>
              <img className='embed' src={i} alt='failed' />
            </div>
          ))}
        </div>
        <div className='ipfs-file-container'>
          {message.ipfsid.length ? (
            <button className='ipfs-file-button'>
              <a href={`https://${message.ipfsid}.ipfs.dweb.link`}>open file</a>
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message
