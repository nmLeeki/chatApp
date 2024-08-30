import React from 'react'
import ChatSidebar from '@/components/ChatContainer/ChatSidebar/ChatSidebar'
import { ChatRoom } from '@/lib/types/chatTypes'
import StyledLeftMenu from '@/components/ChatContainer/LeftMenu/LeftMenu.style'

interface LeftMenuProps {
  chatRooms: ChatRoom[]
  selectedChatRoomId: string
  onSelectChatRoom: (chatRoomId: string) => void
}

const LeftMenu: React.FC<LeftMenuProps> = ({ chatRooms, selectedChatRoomId, onSelectChatRoom }) => {
  return (
    <StyledLeftMenu>
      <ChatSidebar chatRooms={chatRooms} selectedChatRoomId={selectedChatRoomId} onSelectChatRoom={onSelectChatRoom} />
    </StyledLeftMenu>
  )
}

export default LeftMenu
