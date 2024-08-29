import React from 'react'
import { MessageList as ChatMessageList, TypingIndicator, MessageSeparator } from '@chatscope/chat-ui-kit-react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import Message from '@/components/ChatContainer/Message/Message'
import { ChatMessage } from '@/lib/types/chatTypes'
import { StyledTypingIndicator } from '@/components/ChatContainer/MessageList/MessageList.style'

interface MessageListProps {
  messages: ChatMessage[]
  isTyping: boolean
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  return (
    <ChatMessageList
      typingIndicator={
        isTyping ? (
          <StyledTypingIndicator>
            <TypingIndicator content="AI 답변을 생성중입니다..." />
          </StyledTypingIndicator>
        ) : null
      }
    >
      <MessageSeparator content="PM 4:20" />
      {messages.map((message, i) => (
        <Message key={i} message={message} />
      ))}
    </ChatMessageList>
  )
}

export default MessageList
