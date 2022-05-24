import { useQuery } from 'react-query'
import useManageMessage from './useManageMessage'

interface UseMessageQuery {
  topic: string
}

const useMessages = ({ topic }: UseMessageQuery) => {
  const contract = useManageMessage()
  return useQuery(['message', { topic, chainId: contract.chainId }], () =>
    contract.getMessage(topic)
  )
}

export default useMessages
