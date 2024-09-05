import { MessageInput } from '@chatscope/chat-ui-kit-react'
import DOMPurify from 'dompurify'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { chatRoomsState, currentRoomMessageState, selectedChatRoomIdState } from '@/recoil/'
import { useChatGPT } from '@/hooks/useChatGPT'
import { createChatMessage } from '@/types/chatTypes'
import { getCurrentKoreanTime } from '@/services/util'

const MessageInputContainer: React.FC = () => {
  const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
  const OPENAI_API_KEY = import.meta.env.VITE_APP_OPEN_API_KEY

  // Recoil 상태 값들
  const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState)
  const setChatRooms = useSetRecoilState(chatRoomsState)
  const currentRoomMessages = useRecoilValue(currentRoomMessageState) // 현재 채팅방의 메시지 목록
  const setCurrentRoomMessages = useSetRecoilState(currentRoomMessageState)
  const { sendMessageToChatGPT } = useChatGPT(API_ENDPOINT, OPENAI_API_KEY)

  // 현재 채팅방 찾기

  const handleSendMessage = async (message: string) => {
    const sanitizedMessage = DOMPurify.sanitize(message)

    const newUserMessage = createChatMessage(sanitizedMessage, 'user', 'outgoing', 'single', getCurrentKoreanTime())

    // 먼저 사용자의 메시지를 현재 메시지 상태에 추가
    setCurrentRoomMessages((prevMessages) => [...prevMessages, newUserMessage])

    try {
      // currentRoomMessages를 이용해 ChatGPT에게 전송
      const updatedMessages = [...currentRoomMessages, newUserMessage]

      // ChatGPT에게 메시지를 전송하고 응답을 받으면 다시 상태를 업데이트
      sendMessageToChatGPT(updatedMessages, (newMessage) => {
        const newGptMessage = createChatMessage(newMessage.message, 'ChatGPT', 'incoming', 'single', getCurrentKoreanTime())

        // ChatGPT 응답을 현재 메시지 상태에 추가
        setCurrentRoomMessages((prevMessages) => [...prevMessages, newGptMessage])

        // 전체 채팅방 상태 업데이트
        setChatRooms((prevChatRooms) =>
          prevChatRooms.map((chatRoom) =>
            chatRoom.id === selectedChatRoomId
              ? { ...chatRoom, messages: [...chatRoom.messages, newUserMessage, newGptMessage] } // 사용자의 메시지와 GPT의 응답 모두 추가
              : chatRoom,
          ),
        )
      })
    } catch (error) {
      console.error('메시지 전송 실패:', error)
    }
  }

  return (
    <>
      <MessageInput placeholder="질문을 입력해 주세요." onSend={handleSendMessage} />
    </>
  )
}

export default MessageInputContainer
