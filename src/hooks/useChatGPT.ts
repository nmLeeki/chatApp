// hooks/useChatGPT.ts
import { useState } from 'react'
import { sendMessageToChatGPTAPI } from '../services/chatAPI'
import { ChatMessage } from '../types/chatTypes'

export const useChatGPT = (API_ENDPOINT: string, OPENAI_API_KEY: string) => {
  const [isChatbotTyping, setIsChatbotTyping] = useState(false)

  const sendMessageToChatGPT = async (messages: ChatMessage[], onReceiveMessage: (newMessage: ChatMessage) => void) => {
    try {
      // 여기서 상태를 변경해야 합니다.
      setIsChatbotTyping(true)

      // ChatGPT API 호출
      const response = await sendMessageToChatGPTAPI(messages, API_ENDPOINT, OPENAI_API_KEY)

      // 응답을 새로운 메시지로 처리
      const newMessage: ChatMessage = {
        message: response,
        sender: 'ChatGPT',
        direction: 'incoming',
        position: 'single', // 위치는 메시지 목록에서 다르게 처리할 수 있음
      }

      // 응답 메시지 전달
      onReceiveMessage(newMessage)
    } catch (error) {
      console.error('Error sending message to ChatGPT:', error)
    } finally {
      // 채팅이 완료되면 타이핑 상태를 false로 설정
      setIsChatbotTyping(false)
    }
  }

  return { isChatbotTyping, sendMessageToChatGPT }
}
