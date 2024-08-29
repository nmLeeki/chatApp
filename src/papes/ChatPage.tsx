import React, { useState } from 'react'
import { MainContainer } from '@chatscope/chat-ui-kit-react'
import ChatCon from '@/components/ChatContainer/ChatCon/ChatCon'
import MyAppBar from '../components/ChatHeader/AppBar/AppBar'
import { useChatGPT } from '@/lib/hooks/useChatGPT'
import { ChatMessage, ChatRoom } from '@/lib/types/chatTypes'
import avatarImage from '@/assets/ico_avatar_01.svg'

const ChatPage: React.FC = () => {
  const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
  const OPENAI_API_KEY = import.meta.env.VITE_APP_OPEN_API_KEY

  const { isChatbotTyping, sendMessageToChatGPT } = useChatGPT(API_ENDPOINT, OPENAI_API_KEY)
  const [selectedChatRoomId, setSelectedChatRoomId] = useState('1')
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

    await sendMessageToChatGPT([...currentChatRoom.messages, newUserMessage], (newMessage) => {
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
    <MainContainer>
      <MyAppBar
        chatRooms={chatRooms}
        selectedChatRoomId={selectedChatRoomId}
        onSelectChatRoom={handleChatRoomClick}
        onIncreaseFontSize={handleIncreaseFontSize}
        onDecreaseFontSize={handleDecreaseFontSize}
      />
      {currentChatRoom && (
        <ChatCon
          messages={currentChatRoom.messages}
          isTyping={isChatbotTyping}
          onSendMessage={handleUserMessage}
          chatRooms={chatRooms}
          selectedChatRoomId={selectedChatRoomId}
          onSelectChatRoom={handleChatRoomClick}
          toggleLeftDrawer={() => {}}
        />
      )}
    </MainContainer>
  )
}

export default ChatPage
