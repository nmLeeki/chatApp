import React from 'react'
import ChatPage from '@/papes/ChatPage'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import theme from '@/styles/theme'
import './styles/Global.css'
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <div className="App">
          <ChatPage />
        </div>
      </StyledThemeProvider>
    </MuiThemeProvider>
  )
}

export default App
