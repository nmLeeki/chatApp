// components/ChatContainer/LeftMenu/LeftMenu.tsx
import React from 'react'
import StyledLeftMenu from '@/components/ChatContainer/LeftMenu/LeftMenu.style'
import { Avatar, Conversation, ConversationList, Sidebar } from '@chatscope/chat-ui-kit-react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { chatRoomsState, selectedChatRoomIdState } from '@/recoil/'

const LeftMenu: React.FC = () => {
  const chatRooms = useRecoilValue(chatRoomsState) // 전체 채팅방 목록
  const [selectedChatRoomId, setSelectedChatRoomId] = useRecoilState(selectedChatRoomIdState) // 선택된 채팅방 ID
  return (
    <StyledLeftMenu>
      <Sidebar position="left" scrollable={false}>
        <ConversationList>
          {chatRooms.map((chatRoom) => (
            <Conversation key={chatRoom.id} name={chatRoom.name} active={chatRoom.id === selectedChatRoomId} onClick={() => setSelectedChatRoomId(chatRoom.id)}>
              <Avatar src={chatRoom.avatar} name={chatRoom.name} />
            </Conversation>
          ))}
        </ConversationList>
      </Sidebar>
    </StyledLeftMenu>
  )
}

export default LeftMenu
