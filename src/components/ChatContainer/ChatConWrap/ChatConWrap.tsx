import React from 'react'
import { StyledChatConWrap, StyledChatCon } from '@/components/ChatContainer/ChatConWrap/ChatConWrap.style'
interface ChatContainerBoxProps {
  children: React.ReactNode
}

const ChatConWrap: React.FC<ChatContainerBoxProps> = ({ children }) => {
  return (
    <StyledChatConWrap>
      <StyledChatCon>{children}</StyledChatCon>
    </StyledChatConWrap>
  )
}

export default ChatConWrap
