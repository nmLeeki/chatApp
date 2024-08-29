import React from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import DOMPurify from 'dompurify' // DOMPurify로 보안 강화
import { ChatContainer, MessageList, Message, TypingIndicator, MessageInput } from '@chatscope/chat-ui-kit-react'
import { ChatMessage } from '@/lib/types/chatTypes'

interface ChatContainerProps {
  messages: ChatMessage[]
  isTyping: boolean
  onSendMessage: (message: string) => void
}

const ChatContainerComponent: React.FC<ChatContainerProps> = ({ messages, isTyping, onSendMessage }) => {
  const renderMessageContent = (message: string) => {
    // 메시지를 정제
    const sanitizedMessage = DOMPurify.sanitize(message)

    // HTML 콘텐츠를 dangerouslySetInnerHTML로 렌더링
    return <div dangerouslySetInnerHTML={{ __html: sanitizedMessage }} />
  }
  return (
    <ChatContainer>
      <MessageList typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing..." /> : null}>
        {messages.map((message, i) => (
          <Message
            key={i}
            model={{
              message: message.message,
              sentTime: 'just now', // 예시 데이터, 실제 시간을 넣어야 함
              sender: message.sender,
              direction: message.direction,
              position: message.position,
            }}
            style={message.sender === 'ChatGPT' ? { textAlign: 'left' } : {}}
          >
            {renderMessageContent(message.message)}
          </Message>
        ))}
      </MessageList>
      <MessageInput placeholder="Type Message here" onSend={onSendMessage} />
    </ChatContainer>
  )
}

export default ChatContainerComponent
