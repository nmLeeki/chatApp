import React, { useEffect, useRef, useState } from 'react'
import { MessageList } from '@chatscope/chat-ui-kit-react'
import StyledChatList, { StyledTopButton } from '@/components/ChatContainer/MessageList/MessageList.style'
import WelcomeBox from '@/components/ChatContainer/WelcomeBox/WelcomeBox'
import Chat from '@/components/ChatContainer/Message/Message'
import { IconButton } from '@mui/material'
import arrowLeftIcon from '@/assets/images/icons/arrow-left01.svg'

const ChatList: React.FC = () => {
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth >= 768)
  const [showTopButton, setShowTopButton] = useState(false)
  const messageListRef = useRef<HTMLDivElement>(null) // 스크롤 대상 참조
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktopView(e.matches)
    }
    mediaQuery.addEventListener('change', handleMediaChange)
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  // 스크롤 위치에 따라 버튼 표시하는 useEffect
  useEffect(() => {
    const messageList = document.querySelector('.cs-message-list__scroll-wrapper')

    const handleScroll = () => {
      if (messageList) {
        setShowTopButton(messageList.scrollTop > 600) // 스크롤이 600px 이상 내려가면 버튼 표시
      }
    }

    if (messageList) {
      messageList.addEventListener('scroll', handleScroll)
    }

    // cleanup 함수
    return () => {
      if (messageList) {
        messageList.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // 위로 스크롤 이동하는 애니메이션 함수
  const scrollToTop = () => {
    const messageList = document.querySelector('.cs-message-list__scroll-wrapper')
    if (!messageList) return

    const startPosition = messageList.scrollTop
    const duration = 500 // 애니메이션 지속 시간 (ms)
    let startTime: number | null = null

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      // 스크롤을 위한 easeInOut 함수
      const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

      const run = startPosition * (1 - easeInOutQuad(progress))
      messageList.scrollTop = run

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  return (
    <StyledChatList ref={messageListRef}>
      <MessageList>
        <WelcomeBox />
        <Chat />
      </MessageList>

      {showTopButton && (
        <StyledTopButton>
          <IconButton onClick={scrollToTop}>
            <img src={arrowLeftIcon} alt="위로가기" />
          </IconButton>
        </StyledTopButton>
      )}
    </StyledChatList>
  )
}

export default ChatList
