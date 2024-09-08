import React from 'react'

// types/chatTypes.ts

// 채팅 메시지의 타입
export interface ChatMessage {
  message: string
  sender: string
  direction: 'incoming' | 'outgoing'
  position: 'single' | 'first' | 'normal' | 'last'
  timestamp: string
}

// 채팅방의 타입
export interface ChatRoom {
  id: string
  name: string
  avatar: string
  messages: ChatMessage[]
}

//user인지 ChatGPT인지에 따라 채팅 메시지를 생성하는 함수
export const createChatMessage = (message: string, sender: 'user' | 'ChatGPT', direction: 'outgoing' | 'incoming', position: 'single', timestamp: string): ChatMessage => {
  return {
    message,
    sender,
    direction,
    position,
    timestamp,
  }
}

export interface LeftMenuProps {
  onSelectChatRoom: (chatRoomId: string) => void
  onClose: () => void
}

export interface BottomMenuProps {
  onClose: () => void
}
