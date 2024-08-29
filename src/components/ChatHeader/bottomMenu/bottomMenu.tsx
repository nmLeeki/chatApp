import React from 'react'
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

import menuIcon from '@/assets/images/menu.png'
import { StyledDrawerBody, StyledDrawerHeader } from '@/components/ChatHeader/bottomMenu/bottomMenu.style'

interface BottomMenuProps {
  onClose: () => void
}

const BottomMenu: React.FC<BottomMenuProps> = ({ onClose }) => {
  return (
    <Box role="presentation">
      <StyledDrawerHeader>
        <IconButton size="medium" aria-label="닫기" onClick={onClose}>
          <img src={menuIcon} alt="닫기" />
        </IconButton>
        <Typography variant="h2" component="h2">
          챗봇 선택하기
        </Typography>
      </StyledDrawerHeader>
      <StyledDrawerBody>
        <List>
          {['One봇', '정보보호', '예산', '가치평가', 'HR', '준법', 'RPA 챗봇', '디지털체험', '여신관리', 'IT산업'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{/* 아이콘 추가 필요 */}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </StyledDrawerBody>
    </Box>
  )
}

export default BottomMenu
