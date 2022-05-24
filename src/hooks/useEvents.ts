import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import useManageMessage, { EventType } from './useManageMessage'

interface UseEventsQuery {
  topic: string
}

const useEvents = ({ topic }: UseEventsQuery) => {
  const queryClient = useQueryClient()
  const MessageContract = useManageMessage()

  useEffect(() => {
    const handler = (message: any) => {
      if (message.topic !== topic) {
        return
      }

      queryClient.invalidateQueries([
        'message',
        { topic: message.topic, chainId: MessageContract.chainId },
      ])
    }

    MessageContract.contract.on(EventType.Submitted, handler)

    return () => {
      MessageContract.contract.off(EventType.Submitted, handler)
    }
  }, [queryClient, MessageContract.chainId, topic, MessageContract.contract])
}

export default useEvents
