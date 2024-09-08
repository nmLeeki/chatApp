import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from '../../../styles/theme'
import { DatePicker } from '@mui/x-date-pickers';
import MyCDatePicker from '@/components/ui/MyCalendar/MyDatePicker';


SyntaxHighlighter.registerLanguage('javascript', js);

const GuideButton: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>

        <Box bgcolor="#60584c" padding="1em" marginBottom="1em">
          <Typography variant='h1' fontWeight={800} color="#ffbc00">Button</Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap="1em" border="1px solid #ddd" padding="2em 3em" marginBottom="1em">
          <Box display="flex" flexDirection="column" gap="1em">
            <Typography variant='h2' fontWeight={800}>Basic Button</Typography>
            {/* // */}
            <Box display="flex" gap="1em">
              <Button variant="text">Text</Button>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">outlined</Button>
            </Box>

            <Typography variant='h2' fontWeight={800} sx={{ marginTop: "1em" }}>Size</Typography>
            <Box display="flex" gap="1em">
              <Button variant="text" size="small">Text small</Button>
              <Button variant="text" size="medium">Text medium</Button>
              <Button variant="text" size="large">Text large</Button>
            </Box>
            <Box display="flex" gap="1em">
              <Button variant="contained" size="small">Contained small</Button>
              <Button variant="contained" size="medium">Contained medium</Button>
              <Button variant="contained" size="large">Contained large</Button>
            </Box>
            <Box display="flex" gap="1em">
              <Button variant="outlined" size="small">outlined small</Button>
              <Button variant="outlined" size="medium">outlined medium</Button>
              <Button variant="outlined" size="large">outlined large</Button>
            </Box>

            {/* // */}
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap="1em" border="1px solid #ddd" padding="2em 3em" marginBottom="1em">
          <Box display="flex" flexDirection="column" gap="1em">
            <Typography variant='h2' fontWeight={800}>Text button</Typography>
            {/* // */}
            <Box display="flex" gap="1em">
              <Button>Primary</Button>
              <Button disabled>Disabled</Button>
              <Button href="#text-buttons">Link</Button>
            </Box>
            {/* // */}
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap="1em" border="1px solid #ddd" padding="2em 3em" marginBottom="1em">
          <Box display="flex" flexDirection="column" gap="1em">
            <Typography variant='h2' fontWeight={800}>Contained button</Typography>
            {/* // */}
            <Box display="flex" gap="1em">
              <Button variant="contained">Primary</Button>
              <Button variant="contained" disabled>Disabled</Button>
              <Button variant="contained" href="#text-buttons">Link</Button>
            </Box>
            {/* // */}
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap="1em" border="1px solid #ddd" padding="2em 3em" marginBottom="1em">
          <Box display="flex" flexDirection="column" gap="1em">
            <Typography variant='h2' fontWeight={800}>outlined button</Typography>
            {/* // */}
            <Box display="flex" gap="1em">
              <Button variant="outlined">Primary</Button>
              <Button variant="outlined" disabled>Disabled</Button>
              <Button variant="outlined" href="#text-buttons">Link</Button>
            </Box>
            {/* // */}
          </Box>
        </Box>

      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

const codeString = `
  <Button variant="text">Text</Button>
  <Button variant="contained">Contained</Button>
  <Button variant="outlined">outlined</Button>

  <Button variant="text" size="small">Text small</Button>
  <Button variant="text" size="medium">Text medium</Button>
  <Button variant="text" size="large">Text large</Button>

  <Button variant="contained" size="small">Contained small</Button>
  <Button variant="contained" size="medium">Contained medium</Button>
  <Button variant="contained" size="large">Contained large</Button>

  <Button variant="outlined" size="small">outlined small</Button>
  <Button variant="outlined" size="medium">outlined medium</Button>
  <Button variant="outlined" size="large">outlined large</Button>
  
`;

const CodeBlockWithCopy: React.FC = () => {
  const [copied, setCopied] = useState(false);

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
  );
};

const GuideButtonPage: React.FC = () => {

  useEffect(() => {
    // 페이지가 열릴 때 overflow: auto 적용
    document.body.style.overflow = 'auto';

    // 컴포넌트가 언마운트될 때 원래 상태로 복원
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <Box p={3}>
      <GuideButton />
      <CodeBlockWithCopy />
    </Box>
  );
};

export default GuideButtonPage;