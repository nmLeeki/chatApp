import { useState } from 'react'
import './styles/App.css'
import { MainContainer } from '@chatscope/chat-ui-kit-react'
import ChatSidebar from './components/ChatSidebar'
import ChatContainerComponent from './components/ChatContainer'
import { useChatGPT } from './hooks/useChatGPT'
import { ChatRoom, ChatMessage } from './types/chatTypes'
import avatarImage from './assets/ico_avatar_01.svg'

function ChatApp() {
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

    // sendMessageToChatGPT가 타이핑 상태를 관리함
    await sendMessageToChatGPT([...currentChatRoom.messages, newUserMessage], (newMessage) => {
      setChatRooms((prevChatRooms) => prevChatRooms.map((chatRoom) => (chatRoom.id === selectedChatRoomId ? { ...chatRoom, messages: [...chatRoom.messages, newMessage] } : chatRoom)))
    })
  }

  const handleChatRoomClick = (chatRoomId: string) => {
    setSelectedChatRoomId(chatRoomId)
  }

  return (
    <div style={{ position: 'relative', height: '100vh', width: '700px' }}>
      <MainContainer>
        <ChatSidebar chatRooms={chatRooms} selectedChatRoomId={selectedChatRoomId} onSelectChatRoom={handleChatRoomClick} />
        {currentChatRoom && <ChatContainerComponent messages={currentChatRoom.messages} isTyping={isChatbotTyping} onSendMessage={handleUserMessage} />}
      </MainContainer>
    </div>
  )
}

export default ChatApp
