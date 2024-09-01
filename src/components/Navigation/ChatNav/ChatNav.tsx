import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Drawer, Tooltip } from '@mui/material'
import { ChatRoom } from '@/types/chatTypes'
import menuIcon from '@/assets/images/menu.png'
import BottomMenu from '@/components/Navigation/bottomMenu/bottomMenu'
import StyledAppBar from '@/components/Navigation/ChatNav/ChatNav.style'
import LeftMenu from '@/components/ChatContainer/LeftMenu/LeftMenu'

interface AppBarProps {
  chatRooms: ChatRoom[] // ChatSidebar에 전달할 채팅방 목록
  selectedChatRoomId: string // 선택된 채팅방 ID
  onSelectChatRoom: (chatRoomId: string) => void // 채팅방 선택 핸들러
  onIncreaseFontSize: () => void
  onDecreaseFontSize: () => void
}

const ChatNav: React.FC<AppBarProps> = ({ chatRooms, selectedChatRoomId, onSelectChatRoom, onIncreaseFontSize, onDecreaseFontSize }) => {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false)
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false)
  const [isIncrease, setIsIncrease] = useState(true)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleDrawer = (drawer: 'left' | 'bottom', open: boolean) => () => {
    if (drawer === 'left') {
      setIsLeftDrawerOpen(open)
    } else {
      setIsBottomDrawerOpen(open)
    }
  }

  // 글자크기 조정
  const handleToggleFontSize = () => {
    if (isIncrease) {
      onIncreaseFontSize()
    } else {
      onDecreaseFontSize()
    }
    setIsIncrease(!isIncrease)
  }

  return (
    <StyledAppBar>
      <AppBar position="static">
        <Toolbar>
          {!isDesktop && (
            <IconButton
              size="medium"
              aria-label="메뉴"
              onClick={() => setIsLeftDrawerOpen(true)} // LeftDrawer 열기
            >
              <img src={menuIcon} alt="Menu" />
            </IconButton>
          )}
          <Typography variant="h1" component="h1" align="center" sx={{ flexGrow: 1 }}>
            One Bot
          </Typography>
          <Tooltip title="챗봇 선택" arrow>
            <IconButton size="medium" aria-label="챗봇 선택" onClick={toggleDrawer('bottom', true)}>
              <img src={menuIcon} alt="Chatbot Selection" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* LeftMenu Component */}
      <Drawer
        anchor="left"
        open={isLeftDrawerOpen}
        onClose={() => setIsLeftDrawerOpen(false)} // LeftDrawer 닫기
      >
        <LeftMenu chatRooms={chatRooms} selectedChatRoomId={selectedChatRoomId} onSelectChatRoom={onSelectChatRoom} />
      </Drawer>
      <Drawer anchor="bottom" open={isBottomDrawerOpen} onClose={toggleDrawer('bottom', false)}>
        <BottomMenu onClose={toggleDrawer('bottom', false)} />
      </Drawer>
    </StyledAppBar>
  )
}

export default ChatNav
