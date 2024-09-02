import { MessageInput } from '@chatscope/chat-ui-kit-react'
import DOMPurify from 'dompurify'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { chatRoomsState, selectedChatRoomIdState } from '@/recoil/'
import { useChatGPT } from '@/hooks/useChatGPT'
import { ChatMessage } from '@/types/chatTypes'
import { getCurrentKoreanTime } from '@/services/util'

const MessageInputContainer: React.FC = () => {
  const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
  const OPENAI_API_KEY = import.meta.env.VITE_APP_OPEN_API_KEY
  const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState)
  const chatRooms = useRecoilValue(chatRoomsState)
  const setChatRooms = useSetRecoilState(chatRoomsState)
  const { sendMessageToChatGPT } = useChatGPT(API_ENDPOINT, OPENAI_API_KEY)
  const currentChatRoom = chatRooms.find((chatRoom: { id: string }) => chatRoom.id === selectedChatRoomId) // chatRooms에서 현재 채팅방 찾기

  const handleSendMessage = async (message: string) => {
    const sanitizedMessage = DOMPurify.sanitize(message)

    const newUserMessage: ChatMessage = {
      message: sanitizedMessage,
      sender: 'user',
      direction: 'outgoing',
      position: 'single',
      timestamp: getCurrentKoreanTime(),
    }

    // 먼저 사용자의 메시지를 Recoil 상태에 추가
    setChatRooms((prevChatRooms) => prevChatRooms.map((chatRoom) => (chatRoom.id === selectedChatRoomId ? { ...chatRoom, messages: [...chatRoom.messages, newUserMessage] } : chatRoom)))

    try {
      // currentChatRoom이 undefined일 경우 기본값 사용

      const currentMessages = currentChatRoom?.messages ?? []
      // ChatGPT에게 메시지를 전송하고 응답을 받으면 다시 상태를 업데이트
      sendMessageToChatGPT([...currentMessages, newUserMessage], (newMessage) => {
        setChatRooms((prevChatRooms) => prevChatRooms.map((chatRoom) => (chatRoom.id === selectedChatRoomId ? { ...chatRoom, messages: [...chatRoom.messages, newMessage] } : chatRoom)))
      })
    } catch (error) {
      console.error('메시지 전송 실패:', error)
      console.log('asdasdasdasdasd')
    }
  }

  return (
    //기능별 추가될 수 있음
    <>
      <MessageInput placeholder="질문을 입력해 주세요." onSend={handleSendMessage} />
    </>
  )
}

export default MessageInputContainer
