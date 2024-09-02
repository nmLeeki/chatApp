import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Drawer, Tooltip } from '@mui/material'
import menuIcon from '@/assets/images/menu.png'
import BottomMenu from '@/components/Navigation/bottomMenu/bottomMenu'
import StyledAppBar from '@/components/ChatContainer/ChatHeader/ChatHeader.style'
import LeftMenu from '@/components/Navigation/LeftMenu/LeftMenu'
import { useSetRecoilState } from 'recoil'
import { fontSizeState } from '@/recoil/'

const ChatHeader: React.FC = () => {
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false)
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false)
  const setFontSize = useSetRecoilState(fontSizeState)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    window.addEventListener('resize', handleResize)

    // 초기 설정
    handleResize()

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

  const handleToggleFontSize = () => {
    setFontSize((prevSize) => (prevSize === 1.6 ? 1.8 : 1.6))
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
        <LeftMenu />
      </Drawer>
      <Drawer anchor="bottom" open={isBottomDrawerOpen} onClose={toggleDrawer('bottom', false)}>
        <BottomMenu onClose={toggleDrawer('bottom', false)} />
      </Drawer>
    </StyledAppBar>
  )
}

export default ChatHeader
