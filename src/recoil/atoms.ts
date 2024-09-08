import { atom, selector } from 'recoil'
import { ChatRoom, ChatMessage } from '@/types/chatTypes'
import { getCurrentKoreanTime } from '@/services/util'

// 모든 채팅방의 상태
export const chatRoomsState = atom<ChatRoom[]>({
  key: 'chatRoomsState',
  default: [
    {
      id: '1',
      name: '대출',
      avatar: '/src/assets/ico_avatar_01.svg',
      messages: [{ message: 'Hello, I am ChatGPT for Lilly!', sender: 'ChatGPT', direction: 'incoming', position: 'single', timestamp: getCurrentKoreanTime() }],
    },
    {
      id: '2',
      name: '예금',
      avatar: '/src/assets/ico_avatar_01.svg',
      messages: [{ message: 'Hello, I am ChatGPT for Joe!', sender: 'ChatGPT', direction: 'incoming', position: 'single', timestamp: getCurrentKoreanTime() }],
    },
    {
      id: '3',
      name: '보험',
      avatar: '/src/assets/ico_avatar_01.svg',
      messages: [],
    },
  ],
})
// 현재 채팅방의 메시지 목록
export const currentRoomMessageState = atom<ChatMessage[]>({
  key: 'currentRoomMessageState',
  default: [],
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
  default: 1.4,
})

//목록을 선택했을때 선택을 감지하는 상태
export const buttonClickState = atom<boolean>({
  key: 'buttonClickState',
  default: false,
})
