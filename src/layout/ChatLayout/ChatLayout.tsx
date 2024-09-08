import React from 'react'
import { StyledChatLayout } from '@/layout/ChatLayout/ChatLayout.style'
interface ChatContainerBoxProps {
  children: React.ReactNode
}

const ChatLayout: React.FC<ChatContainerBoxProps> = ({ children }) => {
  return <StyledChatLayout>{children}</StyledChatLayout>
}

export default ChatLayout
