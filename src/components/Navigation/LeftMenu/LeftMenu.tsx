import React from 'react'
import StyledLeftMenu from '@/components/Navigation/LeftMenu/LeftMenu.style'
import { Avatar, Conversation, ConversationList, Sidebar } from '@chatscope/chat-ui-kit-react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { buttonClickState, chatRoomsState, selectedChatRoomIdState } from '@/recoil/'

const LeftMenu: React.FC = () => {
  const chatRooms = useRecoilValue(chatRoomsState) // 전체 채팅방 목록
  const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState) // 현재 선택된 채팅방 ID
  const setSelectedChatRoomId = useSetRecoilState(selectedChatRoomIdState)
  const setButtonClick = useSetRecoilState(buttonClickState) // 버튼 클릭 상태 업데이트 함수

  const handleChatRoomClick = (chatRoomId: string) => {
    setSelectedChatRoomId(chatRoomId)
    setButtonClick(true)
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
