import React, { useEffect, useState } from 'react'
import { Avatar, MessageSeparator } from '@chatscope/chat-ui-kit-react'
import { StyledChatBox } from '@/layout/ChatLayout/ChatLayout.style'
import StyledChat from '@/components/ChatContainer/Message/Message.style'
import DOMPurify from 'dompurify'
import { useRecoilValue } from 'recoil'
import { chatRoomsState, currentRoomMessageState, selectedChatRoomIdState } from '@/recoil/'
import { ChatMessage } from '@/types/chatTypes' // ChatMessage 타입을 가져옵니다.

const Chat: React.FC = () => {
  const messages = useRecoilValue(currentRoomMessageState) // 현재 메시지 상태
  const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState) // 선택된 챗봇 ID
  const chatRooms = useRecoilValue(chatRoomsState) // 모든 채팅방 정보
  const currentChatRoom = chatRooms.find((chatRoom) => chatRoom.id === selectedChatRoomId)

  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth >= 768)
  const [lastChatRoomId, setLastChatRoomId] = useState<string | null>(null) // 마지막으로 선택된 챗봇 ID 저장
  const [displayMessages, setDisplayMessages] = useState<ChatMessage[]>([]) // 시스템 메시지를 포함한 메시지 배열

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

  useEffect(() => {
    let updatedMessages = [...displayMessages] // 기존 메시지 유지

    // 챗봇이 변경되었을 때, 시스템 메시지 추가 (중복 방지)
    if (lastChatRoomId && lastChatRoomId !== selectedChatRoomId) {
      const systemMessage: ChatMessage = {
        sender: 'system',
        message: `${currentChatRoom?.name} 챗봇으로 변경되었습니다.`,
        timestamp: new Date().toISOString(),
        direction: 'incoming',
        position: 'single',
      }

      // 시스템 메시지를 추가하기 전에 중복 체크
      const lastSystemMessage = updatedMessages.find((msg) => msg.sender === 'system' && msg.message === systemMessage.message)
      if (!lastSystemMessage) {
        updatedMessages = [...updatedMessages, systemMessage] // 시스템 메시지를 추가
      }
    }

    // 기존 메시지 추가
    updatedMessages = [...updatedMessages, ...messages]
    setDisplayMessages(updatedMessages)
    setLastChatRoomId(selectedChatRoomId) // 마지막 챗봇 ID 업데이트
  }, [messages, selectedChatRoomId, currentChatRoom, lastChatRoomId])

  const renderMessageContent = (message: string) => {
    const sanitizedMessage = DOMPurify.sanitize(message)
    return <div dangerouslySetInnerHTML={{ __html: sanitizedMessage }} />
  }

  return (
    <StyledChat>
      {displayMessages.map((message, i) => (
        <React.Fragment key={i}>
          {message.sender === 'system' ? (
            <div style={{ textAlign: 'center', margin: '10px 0', fontWeight: 'bold' }}>{message.message}</div>
          ) : (
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
          )}
        </React.Fragment>
      ))}
    </StyledChat>
  )
}

export default Chat
