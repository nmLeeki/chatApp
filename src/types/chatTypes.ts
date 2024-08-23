// types/chatTypes.ts
export interface ChatMessage {
  message: string
  sender: string
  direction: 'incoming' | 'outgoing'
  position: 'single' | 'first' | 'normal' | 'last'
}

export interface ChatRoom {
  id: string
  name: string
  avatar: string
  messages: ChatMessage[]
}
