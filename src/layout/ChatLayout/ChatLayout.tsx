import React from 'react'
import { StyledChatLayout, StyledChatCon } from '@/layout/ChatLayout/ChatLayout.style'
interface ChatContainerBoxProps {
  children: React.ReactNode
}

const ChatConWrap: React.FC<ChatContainerBoxProps> = ({ children }) => {
  return (
    <StyledChatLayout>
      <StyledChatCon>{children}</StyledChatCon>
    </StyledChatLayout>
  )
}

export default ChatConWrap
