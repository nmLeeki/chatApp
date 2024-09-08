import React from 'react'
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { BottomMenuProps } from '@/types/chatTypes'
import { StyledDrawerBody, StyledDrawerHeader } from './AddBottomMenu.style'
import menuIcon from '@/assets/images/icons/menu01.svg';

const AddBottomMenu: React.FC<BottomMenuProps> = ({ onClose }) => {
  return (
    <Box role="presentation">
      <StyledDrawerHeader>
        <IconButton size="medium" aria-label="닫기" onClick={onClose}>
          <img src={menuIcon} alt="닫기" />
        </IconButton>
        <Typography variant="h2" component="h2">
          추가메뉴 선택하기
        </Typography>
      </StyledDrawerHeader>
      <StyledDrawerBody>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{/* 아이콘 추가 필요 */}</ListItemIcon>
              <ListItemText primary="글자크기" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{/* 아이콘 추가 필요 */}</ListItemIcon>
              <ListItemText primary="인쇄" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{/* 아이콘 추가 필요 */}</ListItemIcon>
              <ListItemText primary="의견남기기" />
            </ListItemButton>
          </ListItem>
        </List>
      </StyledDrawerBody>
    </Box>
  )
}

export default AddBottomMenu;
