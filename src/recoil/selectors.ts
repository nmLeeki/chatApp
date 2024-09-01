// recoil/selectors.ts
import { selector } from 'recoil'
import { chatRoomsState, selectedChatRoomIdState } from '@/recoil/'
import { ChatMessage } from '@/types/chatTypes'

// 현재 선택된 채팅방의 메시지 목록을 가져오는 selector
export const currentChatRoomMessagesState = selector<ChatMessage[]>({
  key: 'currentChatRoomMessagesState',
  get: ({ get }) => {
    const chatRooms = get(chatRoomsState)
    const selectedChatRoomId = get(selectedChatRoomIdState)
    const currentChatRoom = chatRooms.find((room) => room.id === selectedChatRoomId)
    return currentChatRoom ? currentChatRoom.messages : []
  },
})
