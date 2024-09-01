import React, { useState } from 'react'
import { MainContainer } from '@chatscope/chat-ui-kit-react'
import ChatNav from '@/components/Navigation/ChatNav/ChatNav'
import { useChatGPT } from '@/hooks/useChatGPT'
import { ChatMessage, ChatRoom } from '@/types/chatTypes'
import avatarImage from '@/assets/ico_avatar_01.svg'
import ChatConWrap from '@/components/ChatContainer/ChatConWrap/ChatConWrap'
import ChatContainerComponent from '@/components/ChatContainer'

const ChatPage: React.FC = () => {
  const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
  const OPENAI_API_KEY = import.meta.env.VITE_APP_OPEN_API_KEY

  const { isChatbotTyping, sendMessageToChatGPT } = useChatGPT(API_ENDPOINT, OPENAI_API_KEY)
  const [selectedChatRoomId, setSelectedChatRoomId] = useState('1')
  const [fontSize, setFontSize] = useState(1.6) // fontSize 상태 (rem 단위로 관리)
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false) // LeftDrawer
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: '1',
      name: 'Lilly',
      avatar: avatarImage,
      messages: [{ message: 'Hello, I am ChatGPT for Lilly!', sender: 'ChatGPT', direction: 'incoming', position: 'single' }],
    },
    {
      id: '2',
      name: 'Joe',
      avatar: avatarImage,
      messages: [{ message: 'Hello, I am ChatGPT for Joe!', sender: 'ChatGPT', direction: 'incoming', position: 'single' }],
    },
    {
      id: '3',
      name: 'Emily',
      avatar: avatarImage,
      messages: [],
    },
  ])

  const currentChatRoom = chatRooms.find((chatRoom) => chatRoom.id === selectedChatRoomId)
  const toggleLeftDrawer = (open: boolean) => {
    setIsLeftDrawerOpen(open)
  }
  const handleUserMessage = async (userInput: string) => {
    if (!currentChatRoom) return

    const newUserMessage: ChatMessage = {
      message: userInput,
      sender: 'user',
      direction: 'outgoing',
      position: 'single',
    }

    const updatedChatRooms = chatRooms.map((chatRoom) => (chatRoom.id === selectedChatRoomId ? { ...chatRoom, messages: [...chatRoom.messages, newUserMessage] } : chatRoom))
    setChatRooms(updatedChatRooms)

    console.log(isChatbotTyping)
    await sendMessageToChatGPT([...currentChatRoom.messages, newUserMessage], (newMessage) => {
      console.log('Message received from ChatGPT:', newMessage)
      setChatRooms((prevChatRooms) => prevChatRooms.map((chatRoom) => (chatRoom.id === selectedChatRoomId ? { ...chatRoom, messages: [...chatRoom.messages, newMessage] } : chatRoom)))
    })
  }

  const handleChatRoomClick = (chatRoomId: string) => {
    setSelectedChatRoomId(chatRoomId)
  }

  const handleIncreaseFontSize = () => {
    // 폰트 크기를 증가시키는 로직을 여기에 추가하세요.
  }

  const handleDecreaseFontSize = () => {
    // 폰트 크기를 감소시키는 로직을 여기에 추가하세요.
  }

  return (
    <MainContainer style={{ flexDirection: 'column', fontSize: `${fontSize}rem` }}>
      <ChatNav
        chatRooms={chatRooms}
        selectedChatRoomId={selectedChatRoomId}
        onSelectChatRoom={handleChatRoomClick}
        onIncreaseFontSize={handleIncreaseFontSize}
        onDecreaseFontSize={handleDecreaseFontSize}
      />
      {currentChatRoom && (
        <ChatContainerComponent
          messages={currentChatRoom.messages}
          isTyping={isChatbotTyping}
          onSendMessage={handleUserMessage}
          chatRooms={chatRooms}
          selectedChatRoomId={selectedChatRoomId}
          onSelectChatRoom={handleChatRoomClick}
          toggleLeftDrawer={toggleLeftDrawer}
        />
      )}
    </MainContainer>
  )
}

export default ChatPage
