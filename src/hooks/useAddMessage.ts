import { useMutation } from 'react-query'
import useManageMessage from './useManageMessage'

interface MessagePayload {
  topic: string
  message: string
  ipfsid: string
}

const useAddMessage = () => {
  const contract = useManageMessage()

  return useMutation(async ({ topic, message, ipfsid }: MessagePayload) => {
    await contract.addMessage(topic, message, ipfsid)
  })
}

export default useAddMessage
