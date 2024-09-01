import { Avatar, Conversation, ConversationList, Sidebar } from '@chatscope/chat-ui-kit-react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import React from 'react'
import { ChatRoom } from '@/types/chatTypes'
import StyledSidebar from '@/components/ChatContainer/ChatSidebar/ChatSidebar.style'

interface ChatSidebarProps {
  chatRooms: ChatRoom[]
  selectedChatRoomId: string
  onSelectChatRoom: (chatRoomId: string) => void
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chatRooms, selectedChatRoomId, onSelectChatRoom }) => {
  return (
    <StyledSidebar>
      <Sidebar position="left" scrollable={false}>
        <ConversationList>
          {chatRooms.map((chatRoom) => (
            <Conversation key={chatRoom.id} name={chatRoom.name} active={chatRoom.id === selectedChatRoomId} onClick={() => onSelectChatRoom(chatRoom.id)}>
              <Avatar src={chatRoom.avatar} name={chatRoom.name} />
            </Conversation>
          ))}
        </ConversationList>
      </Sidebar>
    </StyledSidebar>
  )
}

export default ChatSidebar
