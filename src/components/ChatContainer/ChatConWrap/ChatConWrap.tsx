import React from 'react'
import StyledChatContainerBox from '@/components/ChatContainer/ChatConWrap/ChatConWrap.style'

interface ChatContainerBoxProps {
  children: React.ReactNode
}

const ChatConWrap: React.FC<ChatContainerBoxProps> = ({ children }) => {
  return <StyledChatContainerBox>{children}</StyledChatContainerBox>
}

export default ChatConWrap
