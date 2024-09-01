import { atom, selector } from 'recoil'
import { ChatRoom, ChatMessage } from '@/types/chatTypes'
import { getCurrentKoreanTime } from '@/services/util'

// 모든 채팅방의 상태
export const chatRoomsState = atom<ChatRoom[]>({
  key: 'chatRoomsState',
  default: [
    {
      id: '1',
      name: 'Lilly',
      avatar: '/src/assets/ico_avatar_01.svg',
      messages: [{ message: 'Hello, I am ChatGPT for Lilly!', sender: 'ChatGPT', direction: 'incoming', position: 'single', timestamp: getCurrentKoreanTime() }],
    },
    {
      id: '2',
      name: 'Joe',
      avatar: '/src/assets/ico_avatar_01.svg',
      messages: [{ message: 'Hello, I am ChatGPT for Joe!', sender: 'ChatGPT', direction: 'incoming', position: 'single', timestamp: getCurrentKoreanTime() }],
    },
    {
      id: '3',
      name: 'Emily',
      avatar: '/src/assets/ico_avatar_01.svg',
      messages: [],
    },
  ],
})

// 선택된 채팅방 ID의 상태
export const selectedChatRoomIdState = atom<string>({
  key: 'selectedChatRoomIdState',
  default: '1',
})

// 챗봇이 타이핑 중인지 여부를 관리하는 상태
export const isChatbotTypingState = atom<boolean>({
  key: 'isChatbotTypingState',
  default: false,
})
// 챗봇이 타이핑 중인지 여부를 관리하는 상태
export const isLeftDrawerOpenState = atom<boolean>({
  key: 'isLeftDrawerOpenState',
  default: false,
})
// 챗봇이 글자 크기를 관리하는 상태
export const fontSizeState = atom<number>({
  key: 'fontSizeState',
  default: 1.6,
})
