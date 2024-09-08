import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

SyntaxHighlighter.registerLanguage('javascript', js)

const GuideTypography: React.FC = () => {
  return (
    <>
      <Box bgcolor="#60584c" padding="1em" marginBottom="1em">
        <Typography variant="h1" fontWeight={800} color="#ffbc00">
          Typography
        </Typography>
      </Box>

      <Box display="flex" gap="1em">
        <Box display="flex" flexDirection="column" gap="1em" border="1px solid #ddd" padding="2em" marginBottom="1em" flex="1">
          <Typography variant="h2" fontWeight={800}>
            font-family
          </Typography>
          <Typography variant="h3" fontWeight={800}>
            KBFG Display / KBFG Text
          </Typography>
          <Typography variant="body1">KBFG Display / Heading H1, H2</Typography>
          <Typography variant="body2">KBFG Text /Heading H3, H4, Body </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap="1em" border="1px solid #ddd" padding="2em" marginBottom="1em" flex="1">
          <Typography variant="h2" fontWeight={800}>
            font-weight
          </Typography>
          <Typography variant="body2">KBFGDisplayL / 300</Typography>
          <Typography variant="body2">KBFGDisplayM / 500</Typography>
          <Typography variant="body2">KBFGTextL / 300</Typography>
          <Typography variant="body2">KBFGTextM / 500</Typography>
          <Typography variant="body2">KBFGTextM / bold</Typography>
          <Typography variant="body2">KBFGTextB / 700</Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap="1em" border="1px solid #ddd" padding="2em" marginBottom="1em" flex="1">
          <Typography variant="h2" fontWeight={800}>
            line-height
          </Typography>
          <Typography variant="body1">Heading H1, H2, H3, H4 / 120%</Typography>
          <Typography variant="body2">Body / 150% </Typography>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="1em" border="1px solid #ddd" padding="2em" marginBottom="1em">
        <Typography variant="h1">h1. Heading</Typography>
        <Typography variant="h2">h2. Heading</Typography>
        <Typography variant="h3">h3. Heading</Typography>
        <Typography variant="h4">h4. Heading</Typography>
        <Typography variant="subtitle1">subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur</Typography>
        <Typography variant="subtitle2">subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur</Typography>
        <Typography variant="body1">
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant="body2">
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
      </Box>
    </>
  )
}

const codeString = `
<Typography variant="h1">h1. Heading</Typography>

<Typography variant="h2">h2. Heading</Typography>

<Typography variant="h3">h3. Heading</Typography>

<Typography variant="h4">h4. Heading</Typography>

<Typography variant="subtitle1">subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur</Typography>

<Typography variant="subtitle2">subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur</Typography>

<Typography variant="body1">body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quosblanditiis tenetur unde suscipit</Typography>

<Typography variant="body2">body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quosblanditiis tenetur unde suscipit</Typography>

`

const CodeBlockWithCopy: React.FC = () => {
  const [copied, setCopied] = useState(false)

  return (
    <Box>
      {/* <CopyToClipboard text={codeString} onCopy={() => setCopied(true)}>
        <Button variant="contained" sx={{ mb: 2 }}>
          {copied ? 'Copied!' : 'Copy Code'}
        </Button>
      </CopyToClipboard> */}
      <SyntaxHighlighter language="javascript" style={docco}>
        {codeString}
      </SyntaxHighlighter>
    </Box>
  )
}

const GuideTypographyPage: React.FC = () => {
  useEffect(() => {
    // 페이지가 열릴 때 overflow: auto 적용
    document.body.style.overflow = 'auto'

    // 컴포넌트가 언마운트될 때 원래 상태로 복원
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <Box p={3}>
      <GuideTypography />
      <CodeBlockWithCopy />
    </Box>
  )
}

export default GuideTypographyPage
