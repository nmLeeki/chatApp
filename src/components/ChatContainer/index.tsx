import React, { useEffect, useState } from 'react'
import { MessageInput, TypingIndicator, Message, MessageList, ChatContainer, Avatar, MessageSeparator } from '@chatscope/chat-ui-kit-react'
import ChatConWrap from '@/components/ChatContainer/ChatConWrap/ChatConWrap'
import LeftMenu from '@/components/ChatContainer/LeftMenu/LeftMenu'
import { StyledChatBox, StyledTypingIndicator } from '@/components/ChatContainer/ChatConWrap/ChatConWrap.style'
import WelcomeBox from '@/components/ChatContainer/WelcomeBox/WelcomeBox'
import DOMPurify from 'dompurify'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { chatRoomsState, currentChatRoomMessagesState, isChatbotTypingState, selectedChatRoomIdState } from '@/recoil/'
import { useChatGPT } from '@/hooks/useChatGPT'
import { ChatMessage } from '@/types/chatTypes'
import { getCurrentKoreanTime } from '@/services/util'

const ChatContainerComponent: React.FC = () => {
  const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
  const OPENAI_API_KEY = import.meta.env.VITE_APP_OPEN_API_KEY
  const messages = useRecoilValue(currentChatRoomMessagesState)
  const isTyping = useRecoilValue(isChatbotTypingState)
  const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState)
  const chatRooms = useRecoilValue(chatRoomsState)

  const setChatRooms = useSetRecoilState(chatRoomsState)

  const { sendMessageToChatGPT } = useChatGPT(API_ENDPOINT, OPENAI_API_KEY)

  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth >= 768)

  const currentChatRoom = chatRooms.find((chatRoom: { id: string }) => chatRoom.id === selectedChatRoomId) // chatRooms에서 현재 채팅방 찾기

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

  const handleSendMessage = async (message: string) => {
    const sanitizedMessage = DOMPurify.sanitize(message)

    const newUserMessage: ChatMessage = {
      message: sanitizedMessage,
      sender: 'user',
      direction: 'outgoing',
      position: 'single',
      timestamp: getCurrentKoreanTime(),
    }

    // 먼저 사용자의 메시지를 Recoil 상태에 추가
    setChatRooms((prevChatRooms) => prevChatRooms.map((chatRoom) => (chatRoom.id === selectedChatRoomId ? { ...chatRoom, messages: [...chatRoom.messages, newUserMessage] } : chatRoom)))

    try {
      // currentChatRoom이 undefined일 경우 기본값 사용

      const currentMessages = currentChatRoom?.messages ?? []
      console.log(currentMessages)
      // ChatGPT에게 메시지를 전송하고 응답을 받으면 다시 상태를 업데이트
      sendMessageToChatGPT([...currentMessages, newUserMessage], (newMessage) => {
        console.log('Message received from ChatGPT:', newMessage)
        setChatRooms((prevChatRooms) => prevChatRooms.map((chatRoom) => (chatRoom.id === selectedChatRoomId ? { ...chatRoom, messages: [...chatRoom.messages, newMessage] } : chatRoom)))
      })
    } catch (error) {
      console.error('메시지 전송 실패:', error)
      console.log('asdasdasdasdasd')
    }
  }

  return (
    <ChatConWrap>
      {isDesktopView && <LeftMenu />}
      <ChatContainer>
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
        </MessageList>
        <MessageInput placeholder="질문을 입력해 주세요." onSend={handleSendMessage} />
      </ChatContainer>
    </ChatConWrap>
  )
}

export default ChatContainerComponent
