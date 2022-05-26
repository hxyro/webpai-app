import * as wagmi from 'wagmi'
import { useProvider, useSigner } from 'wagmi'
import type { BigNumber } from 'ethers'
import WebpaiContract from '../contract-abi/Webpai.sol/Webpai.json'

export interface Message {
  id: string
  topic: string
  message: string
  ipfsid: string
  creator_address: string
  created_at: BigNumber
}

export enum EventType {
  Submitted = 'Submitted',
}

const useManageMessage = () => {
  const [signer] = useSigner()
  const provider = useProvider()
  const contract = wagmi.useContract({
    addressOrName: '0xeB74284c58401278e99c7EB223569d90a7138b45',
    contractInterface: WebpaiContract.abi,
    signerOrProvider: signer.data || provider,
  })

  const getMessage = async (topic: string): Promise<Message[]> => {
    return contract.getChatHistory(topic).then((message: any) => {
      return message.map((c: any) => ({ ...c }))
    })
  }

  const addMessage = async (
    topic: string,
    message: string,
    ipfsid: string
  ): Promise<void> => {
    await (await contract.addNewMessage(topic, message, ipfsid)).wait()
  }

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    getMessage,
    addMessage,
  }
}

export default useManageMessage
