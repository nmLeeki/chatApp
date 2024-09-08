import React, { useEffect, useState } from 'react'
import { MainContainer } from '@chatscope/chat-ui-kit-react'
import ChatContainerComponent from '@/components/ChatContainer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { chatRoomsState, selectedChatRoomIdState, fontSizeState } from '@/recoil/'
import LeftMenu from '@/components/Navigation/LeftMenu/LeftMenu'
import ChatLayout from '@/layout/ChatLayout/ChatLayout'
import StyledChatCon, { StyledMainCon } from './ChatLayout.style'

const ChatPage: React.FC = () => {
  const chatRooms = useRecoilValue(chatRoomsState) // Recoil 상태에서 채팅방 리스트 가져오기
  const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState) // Recoil 상태에서 선택된 채팅방 ID 가져오기
  const currentChatRoom = chatRooms.find((chatRoom) => chatRoom.id === selectedChatRoomId) // 선택된 채팅방 ID와 일치하는 현재 채팅방을 찾음
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth >= 768) // 화면 너비가 768px 이상일 경우를 체크
  const [fontSize, setFontSize] = useRecoilState(fontSizeState) // Recoil 상태에서 fontSize 가져오기 및 업데이트 함수
  const [isLargeFont, setIsLargeFont] = useState(fontSize === 2.0) // Recoil에서 가져온 fontSize 상태로 초기값 설정

  // 화면 크기 변화에 따라 데스크탑 뷰 여부를 업데이트하는 함수
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    // 미디어 쿼리가 변경될 때 데스크탑 뷰 여부를 업데이트하는 함수
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktopView(e.matches) // true이면 데스크탑 뷰, false이면 모바일 뷰
    }

    // 미디어 쿼리 변화 감지를 위한 이벤트 리스너 추가
    mediaQuery.addEventListener('change', handleMediaChange)

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  // 글자 크기를 토글하는 함수
  const toggleFontSize = () => {
    setIsLargeFont(!isLargeFont) // 글자가 크면 작게, 작으면 크게 변경
    setFontSize((prevSize) => (prevSize === 1.4 ? 2.0 : 1.4)) // Recoil 상태로 글자 크기 업데이트
  }

  // 메뉴 닫기 동작
  const handleCloseMenu = () => {
    // 메뉴 닫기 로직을 여기에 추가 가능
  }

  // 채팅방을 선택하는 함수
  const onSelectChatRoom = (chatRoomId: string) => {
    // 채팅방 선택 시 필요한 동작을 여기서 처리 가능
  }

  return (
    <div className="App">
      <ChatLayout>
        <StyledMainCon>
          <MainContainer style={{ fontSize: `${fontSize}rem` }}>
            {isDesktopView && (
              <LeftMenu
                onClose={handleCloseMenu} // 메뉴 닫기 함수 전달
                onSelectChatRoom={onSelectChatRoom} // 채팅방 선택 함수 전달
              />
            )}
            <StyledChatCon>
              {currentChatRoom && (
                <ChatContainerComponent
                  onToggleFontSize={toggleFontSize} // 글자 크기 토글 함수 전달
                  isLargeFont={isLargeFont} // 글자 크기 상태 전달
                />
              )}
            </StyledChatCon>
          </MainContainer>
        </StyledMainCon>
      </ChatLayout>
    </div>
  )
}

export default ChatPage
