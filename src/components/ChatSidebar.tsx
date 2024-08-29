import React from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { Sidebar, ConversationList, Conversation, Avatar } from '@chatscope/chat-ui-kit-react'
import { ChatRoom } from '@/lib/types/chatTypes'

interface ChatSidebarProps {
  chatRooms: ChatRoom[]
  selectedChatRoomId: string
  onSelectChatRoom: (chatRoomId: string) => void
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chatRooms, selectedChatRoomId, onSelectChatRoom }) => {
  return (
    <Sidebar position="left" scrollable={false}>
      <ConversationList>
        {chatRooms.map((chatRoom) => (
          <Conversation key={chatRoom.id} name={chatRoom.name} active={chatRoom.id === selectedChatRoomId} onClick={() => onSelectChatRoom(chatRoom.id)}>
            <Avatar src={chatRoom.avatar} name={chatRoom.name} />
          </Conversation>
        ))}
      </ConversationList>
    </Sidebar>
  )
}

export default ChatSidebar
