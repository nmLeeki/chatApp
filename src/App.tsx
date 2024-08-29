import { useState } from 'react'
import './styles/App.css'
import { MainContainer } from '@chatscope/chat-ui-kit-react'
import ChatSidebar from '@/components/ChatSidebar'
import ChatContainerComponent from './components/ChatContainer'
import { useChatGPT } from '@/lib/hooks/useChatGPT'
import axios from 'axios' // Mock 서버와 통신하기 위해 사용
import { ChatRoom, ChatMessage } from '@/lib/types/chatTypes'
import avatarImage from '@/assets/ico_avatar_01.svg'

function ChatApp() {
  const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
  const OPENAI_API_KEY = import.meta.env.VITE_APP_OPEN_API_KEY

  const { isChatbotTyping, sendMessageToChatGPT } = useChatGPT(API_ENDPOINT, OPENAI_API_KEY)

  const [selectedChatRoomId, setSelectedChatRoomId] = useState('1')
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: '1',
      name: 'ChatBot',
      avatar: avatarImage,
      messages: [{ message: 'Welcome to the ChatBot room!', sender: 'ChatBot', direction: 'incoming', position: 'single' }],
    },
    {
      id: '2',
      name: 'ChatGPT',
      avatar: avatarImage,
      messages: [{ message: 'Welcome to the ChatGPT room!', sender: 'ChatGPT', direction: 'incoming', position: 'single' }],
    },
    {
      id: '3',
      name: 'Mixed',
      avatar: avatarImage,
      messages: [{ message: 'This room mixes ChatBot and ChatGPT responses!', sender: 'System', direction: 'incoming', position: 'single' }],
    },
  ])

  const currentChatRoom = chatRooms.find((chatRoom) => chatRoom.id === selectedChatRoomId)

  // Mock 서버에서 데이터 가져오기 (ChatBot)
  const fetchChatBotResponse = async () => {
    try {
      const response = await axios.get('http://localhost:5000/messages') // Mock 서버 호출
      const botMessage: ChatMessage = {
        message: response.data[0]?.message || 'No response',
        sender: 'ChatBot',
        direction: 'incoming',
        position: 'single',
      }
      return botMessage
    } catch (error) {
      console.error('Error fetching ChatBot response:', error)
    }
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

    // 각 대화방마다 다른 처리를 진행
    if (currentChatRoom.id === '1') {
      // ChatBot 대화방
      const botMessage = await fetchChatBotResponse()
      if (botMessage) {
        setChatRooms((prevChatRooms) => prevChatRooms.map((chatRoom) => (chatRoom.id === selectedChatRoomId ? { ...chatRoom, messages: [...chatRoom.messages, botMessage] } : chatRoom)))
      }
    } else if (currentChatRoom.id === '2') {
      // ChatGPT 대화방
      try {
        const gptMessage = await sendMessageToChatGPT([...currentChatRoom.messages, newUserMessage])

        if (gptMessage) {
          setChatRooms((prevChatRooms) => prevChatRooms.map((chatRoom) => (chatRoom.id === selectedChatRoomId ? { ...chatRoom, messages: [...chatRoom.messages, gptMessage] } : chatRoom)))
        }
      } catch (error) {
        console.error('Error in ChatGPT room:', error)
      }
    } else if (currentChatRoom.id === '3') {
      // Mixed 대화방: ChatBot과 ChatGPT 모두 응답
      try {
        const botMessage = await fetchChatBotResponse()
        const gptMessage = await sendMessageToChatGPT([...currentChatRoom.messages, newUserMessage])

        if (botMessage && gptMessage) {
          setChatRooms((prevChatRooms) => prevChatRooms.map((chatRoom) => (chatRoom.id === selectedChatRoomId ? { ...chatRoom, messages: [...chatRoom.messages, botMessage, gptMessage] } : chatRoom)))
        }
      } catch (error) {
        console.error('Error in Mixed room:', error)
      }
    }
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
