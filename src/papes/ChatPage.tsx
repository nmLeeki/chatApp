import React from 'react'
import { MainContainer } from '@chatscope/chat-ui-kit-react'
import ChatNav from '@/components/Navigation/ChatNav/ChatNav'
import ChatContainerComponent from '@/components/ChatContainer'
import { useRecoilValue } from 'recoil'
import { chatRoomsState, selectedChatRoomIdState } from '@/recoil/'

const ChatPage: React.FC = () => {
  const chatRooms = useRecoilValue(chatRoomsState)
  const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState)

  const currentChatRoom = chatRooms.find((chatRoom) => chatRoom.id === selectedChatRoomId)

  return (
    <MainContainer style={{ flexDirection: 'column', fontSize: '1.6rem' }}>
      <ChatNav />
      {currentChatRoom && <ChatContainerComponent />}
    </MainContainer>
  )
}

export default ChatPage
