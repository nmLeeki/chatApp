import React, { useEffect, useState } from 'react'
import { Avatar, MessageSeparator } from '@chatscope/chat-ui-kit-react'
import { StyledChatBox } from '@/layout/ChatLayout/ChatLayout.style'
import StyledChat from '@/components/ChatContainer/Message/Message.style'
import DOMPurify from 'dompurify'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { buttonClickState, chatRoomsState, currentRoomMessageState, selectedChatRoomIdState } from '@/recoil/'
import { getCurrentKoreanTime } from '@/services/util'
import { ChatMessage } from '@/types/chatTypes'

const Chat: React.FC = () => {
  const messages = useRecoilValue(currentRoomMessageState)
  const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState)
  const chatRooms = useRecoilValue(chatRoomsState)
  const currentChatRoom = chatRooms.find((chatRoom) => chatRoom.id === selectedChatRoomId)

  const setCurrentRoomMessages = useSetRecoilState(currentRoomMessageState)
  const buttonClicked = useRecoilValue(buttonClickState)
  const setButtonClick = useSetRecoilState(buttonClickState)

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

  // 챗봇이 변경되었을 때, 시스템 메시지와 환영 메시지 추가
  useEffect(() => {
    if (buttonClicked && currentChatRoom) {
      const systemMessage: ChatMessage = {
        sender: 'system',
        message: `${currentChatRoom.name} 챗봇으로 변경되었습니다.`,
        timestamp: getCurrentKoreanTime(),
        direction: 'incoming',
        position: 'single',
      }

      const welcomeMessage: ChatMessage = {
        message: `환영합니다! ${currentChatRoom.name} 챗봇과 대화를 시작합니다.`,
        sender: 'ChatGPT',
        direction: 'incoming',
        position: 'single',
        timestamp: getCurrentKoreanTime(),
      }

      setCurrentRoomMessages((prevMessages) => [...prevMessages, systemMessage, welcomeMessage]) // 메시지 한 번에 추가
      setButtonClick(false)
    }
  }, [buttonClicked, currentChatRoom])

  // 메시지 내용 렌더링 함수
  const renderMessageContent = (message: string) => {
    const sanitizedMessage = DOMPurify.sanitize(message)
    return <div dangerouslySetInnerHTML={{ __html: sanitizedMessage }} />
  }

  // 시스템 메시지 렌더링 컴포넌트
  const SystemMessage: React.FC<{ message: string }> = ({ message }) => <div style={{ textAlign: 'center', margin: '10px 0', fontWeight: 'bold' }}>{message}</div>

  // 일반 메시지 렌더링 컴포넌트
  const ChatMessageBox: React.FC<{ message: ChatMessage }> = ({ message }) => (
    <StyledChatBox isChatGPT={message.sender === 'ChatGPT'}>
      {message.sender === 'ChatGPT' && <Avatar name="Emily" src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg" />}
      <div
        style={{
          textAlign: message.sender === 'ChatGPT' ? 'left' : undefined,
          marginRight: message.sender === 'ChatGPT' ? 0 : undefined,
          marginLeft: message.sender === 'ChatGPT' ? undefined : 0,
          background: '#f1f1f1',
          padding: '10px',
          borderRadius: '10px',
        }}
      >
        {renderMessageContent(message.message)}
      </div>
      <MessageSeparator content={message.timestamp} />
    </StyledChatBox>
  )

  return (
    <StyledChat>
      {messages.map((message, i) => (
        <React.Fragment key={i}>{message.sender === 'system' ? <SystemMessage message={message.message} /> : <ChatMessageBox message={message} />}</React.Fragment>
      ))}
    </StyledChat>
  )
}

export default Chat
