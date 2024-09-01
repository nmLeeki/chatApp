// hooks/useChatGPT.ts
import { useState } from 'react'
import { sendMessageToChatGPTAPI } from '@/services/chatAPI'
import { ChatMessage } from '@/types/chatTypes'

export const useChatGPT = (API_ENDPOINT: string, OPENAI_API_KEY: string) => {
  const [isChatbotTyping, setIsChatbotTyping] = useState(false)

  const sendMessageToChatGPT = (messages: ChatMessage[], onReceiveMessage: (newMessage: ChatMessage) => void) => {
    setIsChatbotTyping(true)

    sendMessageToChatGPTAPI(messages, API_ENDPOINT, OPENAI_API_KEY)
      .then((response) => {
        const newMessage: ChatMessage = {
          message: response,
          sender: 'ChatGPT',
          direction: 'incoming',
          position: 'single',
        }

        console.log(newMessage)
        onReceiveMessage(newMessage)
      })
      .catch((error) => {
        console.error('GPT 에러:', error)
      })
      .finally(() => {
        setIsChatbotTyping(false)
      })
  }

  return { isChatbotTyping, sendMessageToChatGPT }
}
