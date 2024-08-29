import React, { useEffect, useState } from 'react'
import { ChatContainer, MessageInput, TypingIndicator, Avatar, Message, MessageList } from '@chatscope/chat-ui-kit-react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { ChatMessage } from '@/lib/types/chatTypes'
import StyledChatCon, { StyledChatBox, StyledTypingIndicator } from '@/components/ChatContainer/ChatCon/ChatCon.style'
import WelcomeBox from '@/components/ChatContainer/WelcomeBox/WelcomeBox'

interface ChatContainerProps {
  messages: ChatMessage[]
  isTyping: boolean
  onSendMessage: (message: string) => void
  toggleLeftDrawer: (open: boolean) => void
}

const ChatContainerComponent: React.FC<ChatContainerProps> = ({ messages, isTyping, onSendMessage, toggleLeftDrawer }) => {
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth >= 768)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktopView(e.matches)
      toggleLeftDrawer(e.matches)
    }
    if (mediaQuery.matches) {
      toggleLeftDrawer(true)
    }
    mediaQuery.addEventListener('change', handleMediaChange)
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [toggleLeftDrawer])

  return (
    <StyledChatCon>
      <ChatContainer>
        <MessageList>
          {isTyping && (
            <StyledTypingIndicator>
              <TypingIndicator content="AI 답변을 생성중입니다..." />
            </StyledTypingIndicator>
          )}
          <WelcomeBox />
          {messages.map((message, i) => (
            <StyledChatBox key={i} isChatGPT={message.sender === 'ChatGPT'}>
              {message.sender === 'ChatGPT' && <Avatar name="Emily" src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg" />}
              <Message
                key={i}
                model={{
                  message: message.message,
                  sentTime: 'just now',
                  sender: message.sender,
                  direction: message.direction,
                  position: message.position,
                }}
                style={{
                  textAlign: message.sender === 'ChatGPT' ? 'left' : undefined,
                  marginRight: message.sender === 'ChatGPT' ? 0 : undefined,
                  marginLeft: message.sender === 'ChatGPT' ? undefined : 0,
                }}
              >
                {message.message}
              </Message>
              {/* 메시지 구분선을 추가하려면 여기에 코드를 작성하세요 */}
            </StyledChatBox>
          ))}
        </MessageList>
        <MessageInput autoFocus placeholder="질문을 입력해 주세요." onSend={onSendMessage} />
      </ChatContainer>
    </StyledChatCon>
  )
}

export default ChatContainerComponent
