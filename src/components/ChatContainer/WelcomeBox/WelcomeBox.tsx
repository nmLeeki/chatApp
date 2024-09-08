import React from 'react'
import StyledWelcomeBox from '@/components/ChatContainer/WelcomeBox/WelcomeBox.style'
import { Box, Button, Typography } from '@mui/material'

const WelcomeBox: React.FC = () => {
  return (
    <StyledWelcomeBox>
      <Typography variant="h2" fontSize="1em">
        안녕하세요.
        <Typography variant="body2" color="red.main">
          One 봇
        </Typography>
        입니다.
      </Typography>
      <Typography variant="body1" fontWeight="800" fontSize="1.6em">
        국민님, 무엇이 궁금하신가요?
      </Typography>
      <Box display="flex" flexWrap="wrap" gap="1em" marginTop="1em">
        <Button variant="outlined">영업점 추천 예금 상품</Button>
        <Button variant="outlined">오늘의 환율</Button>
        <Button variant="outlined">KB인증서 발급하기</Button>
      </Box>
    </StyledWelcomeBox>
  )
}

export default WelcomeBox
