import React from 'react'
import StyledLeftMenu from '@/components/Navigation/LeftMenu/LeftMenu.style'
import { Avatar, Conversation, ConversationList, Sidebar } from '@chatscope/chat-ui-kit-react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { chatRoomsState, currentRoomMessageState, selectedChatRoomIdState } from '@/recoil/'
import { getCurrentKoreanTime } from '@/services/util'
import { ChatMessage } from '@/types/chatTypes'

const LeftMenu: React.FC = () => {
  const chatRooms = useRecoilValue(chatRoomsState) // 전체 채팅방 목록
  const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState) // 현재 선택된 채팅방 ID
  const setSelectedChatRoomId = useSetRecoilState(selectedChatRoomIdState)
  const setCurrentRoomMessages = useSetRecoilState(currentRoomMessageState)

  const handleChatRoomClick = (chatRoomId: string) => {
    const chatRoom = chatRooms.find((room) => room.id === chatRoomId)
    const welcomeMessage: ChatMessage = {
      message: `환영합니다! ${chatRoom?.name} 챗봇과 대화를 시작합니다.`,
      sender: 'ChatGPT',
      direction: 'incoming',
      position: 'single',
      timestamp: getCurrentKoreanTime(),
    }
    setSelectedChatRoomId(chatRoomId)
    setCurrentRoomMessages((prevMessages) => [...prevMessages, welcomeMessage]) // 환영 인사를 현재 메시지 목록에 추가
  }

  return (
    <StyledLeftMenu>
      <Sidebar position="left" scrollable={false}>
        <ConversationList>
          {chatRooms.map((chatRoom) => (
            <Conversation key={chatRoom.id} name={chatRoom.name} active={chatRoom.id === selectedChatRoomId} onClick={() => handleChatRoomClick(chatRoom.id)}>
              <Avatar src={chatRoom.avatar} name={chatRoom.name} />
            </Conversation>
          ))}
        </ConversationList>
      </Sidebar>
    </StyledLeftMenu>
  )
}

export default LeftMenu
