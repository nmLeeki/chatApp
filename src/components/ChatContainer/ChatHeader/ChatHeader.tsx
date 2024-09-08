import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Drawer, Tooltip } from '@mui/material'
import StyledChatNav, { StyledfontBtn, StyledMenuBtn } from './ChatHeader.style'
import LeftMenu from '@/components/Navigation/LeftMenu/LeftMenu'
import BottomMenu from '@/components/Navigation/BottomMenu/BottomMenu'
import menuIcon from '@/assets/images/icons/menu01.svg'
import fontSizeIcon from '@/assets/images/icons/font_size.svg'

const ChatHeader: React.FC<{ onToggleFontSize: () => void; isLargeFont: boolean }> = ({ onToggleFontSize, isLargeFont }) => {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false)
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
      if (window.innerWidth < 768) {
        setIsLeftDrawerOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // left, bottom menu
  const toggleDrawer = (drawer: 'left' | 'bottom', open: boolean) => () => {
    if (drawer === 'left') {
      setIsLeftDrawerOpen(open)
    } else {
      setIsBottomDrawerOpen(open)
    }
  }

  const onSelectChatRoom = (chatRoomId: string) => {}

  return (
    <StyledChatNav>
      <AppBar position="static">
        <Toolbar>
          {!isDesktop && (
            <StyledMenuBtn>
              <IconButton size="medium" aria-label="메뉴" onClick={() => setIsLeftDrawerOpen(true)}>
                <img src={menuIcon} alt="" />
              </IconButton>
            </StyledMenuBtn>
          )}
          <Typography variant="h1" align="center" sx={{ flexGrow: 1 }}>
            One Bot
          </Typography>
          <StyledfontBtn>
            <Tooltip title={isLargeFont ? '글자 작게' : '글자 크게'} arrow>
              <IconButton size="medium" aria-label={isLargeFont ? '글자 작게' : '글자 크게'} onClick={onToggleFontSize}>
                <img src={fontSizeIcon} alt="" />
              </IconButton>
            </Tooltip>
          </StyledfontBtn>
          {/* <Tooltip title="챗봇 선택" arrow>
            <IconButton size="medium" aria-label="챗봇 선택" onClick={toggleDrawer('bottom', true)}>
              <img src={menuIcon} alt="Chatbot Selection" />
            </IconButton>
          </Tooltip> */}
        </Toolbar>
      </AppBar>

      {!isDesktop && (
        <Drawer anchor="left" open={isLeftDrawerOpen} onClose={() => setIsLeftDrawerOpen(false)}>
          <LeftMenu
            onClose={() => setIsLeftDrawerOpen(false)}
            onSelectChatRoom={onSelectChatRoom} // onSelectChatRoom 전달
          />
        </Drawer>
      )}

      {/* 챗봇선택 BottomMenu */}
      <Drawer anchor="bottom" open={isBottomDrawerOpen} onClose={toggleDrawer('bottom', false)}>
        <BottomMenu onClose={toggleDrawer('bottom', false)} />
      </Drawer>
    </StyledChatNav>
  )
}

export default ChatHeader
