import React from 'react'
import { StyledChatConWrap, StyledChatCon } from '@/components/ChatContainer/ChatConWrap/ChatConWrap.style'
import { ChatContainer } from '@chatscope/chat-ui-kit-react'
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
