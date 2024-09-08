import React, { useEffect, useState } from 'react'
import StyledLeftMenu, { StyledFavorite, StyledListBot, StyledUserInfo, StyledUserNm } from '@/components/Navigation/LeftMenu/LeftMenu.style'
import { Avatar, Conversation, ConversationList, Sidebar } from '@chatscope/chat-ui-kit-react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { buttonClickState, chatRoomsState, selectedChatRoomIdState } from '@/recoil/'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { LeftMenuProps } from '@/types/chatTypes'
import menuIcon from '@/assets/images/icons/menu01.svg'
import arrowLeftIcon from '@/assets/images/icons/arrow-left01.svg'
import starIconOff from '@/assets/images/icons/star_off.svg'
import starIconOn from '@/assets/images/icons/star_on.svg'

const LeftMenu: React.FC<LeftMenuProps> = ({ onSelectChatRoom, onClose }) => {
  const chatRooms = useRecoilValue(chatRoomsState) // 전체 채팅방 목록
  const selectedChatRoomId = useRecoilValue(selectedChatRoomIdState) // 현재 선택된 채팅방 ID
  const setSelectedChatRoomId = useSetRecoilState(selectedChatRoomIdState)
  const setButtonClick = useSetRecoilState(buttonClickState) // 버튼 클릭 상태 업데이트 함수
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768) // 화면 크기에 따른 상태
  const [isMenuOpen, setIsMenuOpen] = useState(true) // 메뉴 열림/닫힘 상태
  const [isClosing, setIsClosing] = useState(false) // 닫힘 상태 애니메이션
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({}) // 즐겨찾기 상태

  const handleChatRoomClick = (chatRoomId: string) => {
    setSelectedChatRoomId(chatRoomId)
    setButtonClick(true)
  }

  const toggleFavorite = (chatRoomId: string) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [chatRoomId]: !prevFavorites[chatRoomId], // 즐겨찾기 상태를 토글
    }))
  }

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    window.addEventListener('resize', handleResize)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleToggle = () => {
    if (isMenuOpen) {
      setIsClosing(true) // 닫힘 상태로 전환
      setTimeout(() => {
        setIsMenuOpen(false) // 닫힘 애니메이션 이후 메뉴 상태 변경
        setIsClosing(false) // 애니메이션 종료
      }, 500)
    } else {
      setIsMenuOpen(true) // 열림 상태로 전환
    }
  }

  return (
    <StyledLeftMenu className={isDesktop ? 'pc-left-menu' : 'mo-left-menu'} isMenuOpen={isMenuOpen} isClosing={isClosing}>
      {/* 모바일 환경에서는 닫기 버튼을 표시 */}
      {!isDesktop && (
        <IconButton size="small" aria-label="닫기" onClick={onClose} className="btn-close">
          <img src={arrowLeftIcon} alt="" />
        </IconButton>
      )}
      {/* PC 환경에서는 토글 버튼을 표시 */}
      {isDesktop && (
        <IconButton size="small" aria-label={isMenuOpen ? '메뉴 접힘' : '메뉴 펼침'} onClick={handleToggle} className={isMenuOpen ? 'btn-toggle close' : 'btn-toggle'}>
          {isMenuOpen ? <img src={arrowLeftIcon} alt="" /> : <img src={menuIcon} alt="" />}
        </IconButton>
      )}
      <Sidebar position="left" scrollable={true}>
        <StyledUserInfo isMenuOpen={isMenuOpen} isClosing={isClosing}>
          <Avatar src="/src/assets/images/icons/bot01.svg" name="김국민 대리" />
          <StyledUserNm isMenuOpen={isMenuOpen} isClosing={isClosing}>
            <Typography variant="body1">김국민 대리</Typography>
            <Typography variant="body2">고객컨택혁신부서</Typography>
          </StyledUserNm>
        </StyledUserInfo>
        <ConversationList>
          {chatRooms.map((chatRoom) => (
            <Conversation key={chatRoom.id}>
              <Conversation.Content>
                <StyledListBot isMenuOpen={isMenuOpen} isClosing={isClosing}>
                  <Button variant="text" onClick={() => handleChatRoomClick(chatRoom.id)}>
                    <Avatar src={chatRoom.avatar} name={chatRoom.name} />
                    <Typography variant="body2">{chatRoom.name}</Typography>
                  </Button>
                  <StyledFavorite>
                    <IconButton onClick={() => toggleFavorite(chatRoom.id)}>
                      <img src={favorites[chatRoom.id] ? starIconOn : starIconOff} alt={favorites[chatRoom.id] ? '즐겨찾기 해제' : '즐겨찾기 등록'} />
                    </IconButton>
                  </StyledFavorite>
                </StyledListBot>
              </Conversation.Content>
            </Conversation>
          ))}
        </ConversationList>
      </Sidebar>
    </StyledLeftMenu>
  )
}

export default LeftMenu
