import React, { useEffect, useState } from 'react'
import { MessageList } from '@chatscope/chat-ui-kit-react'
import StyledChatList from '@/components/ChatContainer/MessageList/MessageList.style'
import WelcomeBox from '@/components/ChatContainer/WelcomeBox/WelcomeBox'
import Chat from '@/components/ChatContainer/Message/Message'

const ChatList: React.FC = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktopView(e.matches)
    }
    mediaQuery.addEventListener('change', handleMediaChange)
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktopView(e.matches)
    }
    mediaQuery.addEventListener('change', handleMediaChange)
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return (
    <StyledChatList>
      <MessageList>
        <WelcomeBox />
        <Chat />
      </MessageList>
    </StyledChatList>
  )
}

export default ChatList
