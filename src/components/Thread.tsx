import { useParams } from 'react-router-dom'
import ChatHistory from './ChatHistory'

function Thread() {
  const { id } = useParams()
  return <ChatHistory topic={id || 'main'} />
}

export default Thread
