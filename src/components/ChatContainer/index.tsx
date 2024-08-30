import React, { useEffect, useState } from 'react'
import { MessageInput, TypingIndicator, Avatar, Message, MessageList, ChatContainer, MessageSeparator } from '@chatscope/chat-ui-kit-react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import DOMPurify from 'dompurify'
import { ChatMessage, ChatRoom } from '@/lib/types/chatTypes'
import { StyledChatBox, StyledTypingIndicator } from '@/components/ChatContainer/ChatConWrap/ChatConWrap.style'
import WelcomeBox from '@/components/ChatContainer/WelcomeBox/WelcomeBox'
import ChatConWrap from '@/components/ChatContainer/ChatConWrap/ChatConWrap'
import ChatSidebar from '@/components/ChatContainer/ChatSidebar/ChatSidebar'

interface ChatContainerProps {
  messages: ChatMessage[]
  isTyping: boolean
  onSendMessage: (message: string) => void
  chatRooms: ChatRoom[]
  selectedChatRoomId: string
  onSelectChatRoom: (chatRoomId: string) => void
  toggleLeftDrawer: (open: boolean) => void
}

const ChatContainerComponent: React.FC<ChatContainerProps> = ({ messages, isTyping, onSendMessage, chatRooms, selectedChatRoomId, onSelectChatRoom, toggleLeftDrawer }) => {
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
  const renderMessageContent = (message: string) => {
    const sanitizedMessage = DOMPurify.sanitize(message)
    return <div dangerouslySetInnerHTML={{ __html: sanitizedMessage }} />
  }

  const handleSendMessage = (message: string) => {
    const sanitizedMessage = DOMPurify.sanitize(message)
    onSendMessage(sanitizedMessage)
  }
  return (
    <ChatConWrap>
      {isDesktopView && <ChatSidebar chatRooms={chatRooms} selectedChatRoomId={selectedChatRoomId} onSelectChatRoom={onSelectChatRoom} />}
      <ChatContainer>
        <MessageList
          typingIndicator={
            isTyping ? (
              // AI답변 생성중
              <StyledTypingIndicator>
                <TypingIndicator content="AI 답변을 생성중입니다..." />
              </StyledTypingIndicator>
            ) : //AI답변 생성완료
            // <StyledTypingIndicatorComplete>
            //   <TypingIndicator content="AI 답변이 생성되었습니다." />
            //   <Button variant='text'>답변보러가기</Button>
            // </StyledTypingIndicatorComplete>
            null
          }
        >
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
                {renderMessageContent(message.message)}
              </Message>
              <MessageSeparator content="PM 4:20" />
            </StyledChatBox>
          ))}
        </MessageList>
        <MessageInput autoFocus placeholder="질문을 입력해 주세요." onSend={handleSendMessage} />
      </ChatContainer>
    </ChatConWrap>
  )
}

export default ChatContainerComponent
