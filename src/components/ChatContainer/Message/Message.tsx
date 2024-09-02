import React, { useEffect, useState } from 'react'
import { Message, Avatar, MessageSeparator } from '@chatscope/chat-ui-kit-react'
import { StyledChatBox } from '@/layout/ChatLayout/ChatLayout.style'
import StyledChat from '@/components/ChatContainer/Message/Message.style'
import DOMPurify from 'dompurify'
import { useRecoilValue } from 'recoil'
import { currentChatRoomMessagesState } from '@/recoil/'

const Chat: React.FC = () => {
  const messages = useRecoilValue(currentChatRoomMessagesState)
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

  const renderMessageContent = (message: string) => {
    const sanitizedMessage = DOMPurify.sanitize(message)
    return <div dangerouslySetInnerHTML={{ __html: sanitizedMessage }} />
  }

  return (
    <StyledChat>
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
          <MessageSeparator content={message.timestamp} />
        </StyledChatBox>
      ))}
    </StyledChat>
  )
}
export default Chat
