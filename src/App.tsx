import React from 'react'

import { RecoilRoot } from 'recoil'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import theme from '@/styles/theme'
import './styles/Global.css'
import ChatPage from '@/papes/ChatPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GuideButtonPage from '@/papes/guide/GuideButton/GuideButton'
import GuideTypographyPage from '@/papes/guide/GuideTypography/GuideTypography'
import GuideDatepickerPage from '@/papes/guide/GuideDatepicker/Datepicker'

function App() {
  return (
    <RecoilRoot>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<ChatPage />} />
              <Route path="/guide/GuideButton" element={<GuideButtonPage />} />
              <Route path="/guide/GuideTypography" element={<GuideTypographyPage />} />
              <Route path="/guide/GuideDatePicker" element={<GuideDatepickerPage />} />
            </Routes>
          </Router>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </RecoilRoot>
  )
}

export default App
