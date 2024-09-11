import React, { useEffect, useState } from 'react'
import { Avatar, MessageSeparator } from '@chatscope/chat-ui-kit-react'
import StyledChat, {
  StyledChatBox,
  StyledChatBubble,
  StyledChatDate,
  StyledChatMessage,
  StyledChatStart,
  StyledChatText,
  StyledChatTime,
  StyledTypingIndicator,
} from '@/components/ChatContainer/Message/Message.style'
import DOMPurify from 'dompurify'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { buttonClickState, chatRoomsState, currentRoomMessageState, selectedChatRoomIdState } from '@/recoil/'
import { getCurrentKoreanTime } from '@/services/util'
import { ChatMessage } from '@/types/chatTypes'
import { Typography } from '@mui/material'
import useWebSocket from '@/services/useWebSocket'

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
  const SystemMessage: React.FC<{ message: string }> = ({ message }) => (
    <>
      <StyledChatDate>
        <MessageSeparator content={'2024.9.5'} />
      </StyledChatDate>
      <StyledChatStart>
        <MessageSeparator content={`${message}과 대화를 시작합니다.`} />
      </StyledChatStart>
    </>
  )

  // 채팅 메시지 챗봇 답변 컴포넌트
  const ChatMessageAnswerBox: React.FC<{ message: ChatMessage }> = ({ message }) => (
    <StyledChatBubble isChatGPT={message.sender === 'ChatGPT'}>
      <Avatar name="Emily" src="/src/assets/images/icons/bot01.svg" />
      <StyledTypingIndicator>
        <Typography variant="body1">AI 답변을 생성 중입니다...</Typography>
      </StyledTypingIndicator>
      <StyledChatText>
        <Typography variant="body1">안녕하세요. One 봇 입니다.</Typography>
        <Typography variant="body1">퇴직연금 업무에 대해 궁금하신 점을 알려주세요.</Typography>
      </StyledChatText>
      <StyledChatMessage isChatGPT={message.sender === 'ChatGPT'}>{renderMessageContent(message.message)}</StyledChatMessage>
      <StyledChatTime>
        <MessageSeparator content={message.timestamp} />
      </StyledChatTime>
    </StyledChatBubble>
  )

  // 채팅 메시지 사용자 입력 컴포넌트
  const ChatMessageBox: React.FC<{ message: ChatMessage }> = ({ message }) => (
    <StyledChatBubble isChatGPT={message.sender === 'ChatGPT'}>
      <StyledChatMessage isChatGPT={message.sender === 'ChatGPT'}>"{renderMessageContent(message.message)}"</StyledChatMessage>
      <StyledChatTime>
        <MessageSeparator content={message.timestamp} />
      </StyledChatTime>
    </StyledChatBubble>
  )

  return (
    <>
      {messages.map((message, i) => (
        <StyledChat key={i}>
          <StyledChatBox isChatGPT={message.sender === 'ChatGPT'}>
            {message.sender === 'system' ? (
              <SystemMessage message={message.message} />
            ) : message.sender === 'chatGPT' ? (
              <ChatMessageAnswerBox message={message} />
            ) : (
              <ChatMessageBox message={message} />
            )}
          </StyledChatBox>
        </StyledChat>
      ))}
    </>
  )
}

export default Chat
