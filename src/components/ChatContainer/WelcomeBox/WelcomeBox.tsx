import React from 'react'
import StyledWelcomeBox from '@/components/ChatContainer/WelcomeBox/WelcomeBox.style'
import { Box, Button, Typography } from '@mui/material'

const WelcomeBox: React.FC = () => {
  return (
    <StyledWelcomeBox>
      <Typography variant="h2" component="h2" fontSize="1em">
        안녕하세요.{' '}
        <Typography variant="body2" color="red.main" fontWeight="600">
          One 봇
        </Typography>
        입니다.
      </Typography>
      <Typography variant="body1" fontWeight="800" fontSize="1.6em">
        국민님, 무엇이 궁금하신가요?
      </Typography>
      <Box display="flex" flexWrap="wrap" gap="1em" marginTop="1em">
        <Button variant="outlined">수신청약(D)</Button>
        <Button variant="outlined">퇴직연금(D)</Button>
        <Button variant="outlined">여신(가계/기금)(D)</Button>
        <Button variant="outlined">기업여신/B2B(D)</Button>
        <Button variant="outlined">전자금융(D)</Button>
        <Button variant="outlined">외환(D)</Button>
      </Box>
    </StyledWelcomeBox>
  )
}

export default WelcomeBox
