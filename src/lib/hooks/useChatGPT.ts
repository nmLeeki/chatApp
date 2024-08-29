// hooks/useChatGPT.ts
import { useState } from 'react'
import { sendMessageToChatGPTAPI } from '@/lib/api/chatAPI'
import { ChatMessage } from '@/lib/types/chatTypes'

export const useChatGPT = (API_ENDPOINT: string, OPENAI_API_KEY: string) => {
  const [isChatbotTyping, setIsChatbotTyping] = useState(false)

  const sendMessageToChatGPT = async (messages: ChatMessage[]): Promise<ChatMessage | null> => {
    try {
      setIsChatbotTyping(true)

      const response = await sendMessageToChatGPTAPI(messages, API_ENDPOINT, OPENAI_API_KEY)

      const newMessage: ChatMessage = {
        message: response,
        sender: 'ChatGPT',
        direction: 'incoming',
        position: 'single',
      }

      setIsChatbotTyping(false)
      return newMessage // 메시지를 반환
    } catch (error) {
      console.error('ChatGPT 통신 오류:', error)
      setIsChatbotTyping(false)
      return null
    }
  }

  return { isChatbotTyping, sendMessageToChatGPT }
}
