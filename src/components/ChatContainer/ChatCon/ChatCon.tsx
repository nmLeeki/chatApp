import React, { useEffect, useState } from 'react'
import { Avatar, ChatContainer, Message, MessageInput, MessageList, MessageSeparator, TypingIndicator } from '@chatscope/chat-ui-kit-react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import DOMPurify from 'dompurify'
import { ChatMessage, ChatRoom } from '@/lib/types/chatTypes'
import StyledChatContainer, { StyledChatBox, StyledTypingIndicator, StyledTypingIndicatorComplete } from '@/components/ChatContainer/ChatCon/ChatCon.style'
import WelcomeBox from '@/components/ChatContainer/WelcomeBox/WelcomeBox'
import ChatSidebar from '@/components/ChatNavigation/ChatSidebar/ChatSidebar'
import { Button } from '@mui/material'

interface ChatContainerProps {
  messages: ChatMessage[]
  isTyping: boolean
  onSendMessage: (message: string) => void
  chatRooms: ChatRoom[]
  selectedChatRoomId: string
  onSelectChatRoom: (chatRoomId: string) => void
  toggleLeftDrawer: (open: boolean) => void
}

const ChatCon: React.FC<ChatContainerProps> = ({ messages, isTyping, onSendMessage, chatRooms, selectedChatRoomId, onSelectChatRoom, toggleLeftDrawer }) => {
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth >= 768)

  useEffect(() => {
    // 화면 크기에 따른 left menu open 상태 제어
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktopView(e.matches)
      toggleLeftDrawer(e.matches) // 768px 이상일 때 leftmenu 열림
    }

    // 처음 로드될 때 미디어 쿼리 상태에 따라 Drawer 열기/닫기 설정
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
    <StyledChatContainer>
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
    </StyledChatContainer>
  )
}

export default ChatCon
