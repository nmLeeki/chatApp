import React from 'react'
import { Message as ChatMessageComponent, Avatar } from '@chatscope/chat-ui-kit-react'
import DOMPurify from 'dompurify'
import { ChatMessage } from '@/lib/types/chatTypes'
import { StyledChatBox } from '@/components/ChatContainer/Message/Message.style'

interface MessageProps {
  message: ChatMessage
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const renderMessageContent = (messageContent: string) => {
    const sanitizedMessage = DOMPurify.sanitize(messageContent)
    return <div dangerouslySetInnerHTML={{ __html: sanitizedMessage }} />
  }

  return (
    <StyledChatBox isChatGPT={message.sender === 'ChatGPT'}>
      {message.sender === 'ChatGPT' && <Avatar name="Emily" src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg" />}
      <ChatMessageComponent
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
        asdasdasdasdasd
      </ChatMessageComponent>
    </StyledChatBox>
  )
}

export default Message
