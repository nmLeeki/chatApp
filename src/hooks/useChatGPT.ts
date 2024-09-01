import { useSetRecoilState, useRecoilValue } from 'recoil'
import { sendMessageToChatGPTAPI } from '@/services/chatAPI'
import { selectedChatRoomIdState, isChatbotTypingState } from '@/recoil/'
import { ChatMessage } from '@/types/chatTypes'
import { getCurrentKoreanTime } from '@/services/util'

export const useChatGPT = (API_ENDPOINT: string, OPENAI_API_KEY: string) => {
  const setIsChatbotTyping = useSetRecoilState(isChatbotTypingState)
  const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState)

  const sendMessageToChatGPT = async (messages: ChatMessage[], onReceiveMessage: (newMessage: ChatMessage) => void) => {
    if (!selectedChatRoomId) {
      return
    }
    setIsChatbotTyping(true)
    try {
      const response = await sendMessageToChatGPTAPI(messages, API_ENDPOINT, OPENAI_API_KEY)
      if (response) {
        const newMessage: ChatMessage = {
          message: response,
          sender: 'ChatGPT',
          direction: 'incoming',
          position: 'single',
          timestamp: getCurrentKoreanTime(),
        }
        onReceiveMessage(newMessage)
      } else {
        console.error('응답 메시지가 없습니다.')
      }
    } catch (error) {
      console.error('ChatGPT 메시지 전송 실패:', error)
    } finally {
      setIsChatbotTyping(false)
    }
  }

  return { sendMessageToChatGPT }
}
