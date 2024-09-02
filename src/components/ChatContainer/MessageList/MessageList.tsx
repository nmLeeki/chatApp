import React, { useEffect, useState } from 'react'
import { TypingIndicator, MessageList } from '@chatscope/chat-ui-kit-react'
import StyledChatList from '@/components/ChatContainer/MessageList/MessageList.style'
import { StyledTypingIndicator } from '@/layout/ChatLayout/ChatLayout.style'
import WelcomeBox from '@/components/ChatContainer/WelcomeBox/WelcomeBox'
import { isChatbotTypingState } from '@/recoil/'
import Chat from '@/components/ChatContainer/Message/Message'
import { useRecoilValue } from 'recoil'

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
  const isTyping = useRecoilValue(isChatbotTypingState)

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
      <MessageList
        typingIndicator={
          isTyping ? (
            <StyledTypingIndicator>
              <TypingIndicator content="AI 답변을 생성중입니다..." />
            </StyledTypingIndicator>
          ) : null
        }
      >
        <WelcomeBox />
        <Chat />
      </MessageList>
    </StyledChatList>
  )
}

export default ChatList
