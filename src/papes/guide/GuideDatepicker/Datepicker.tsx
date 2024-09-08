import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from '../../../styles/theme'
import MyDatePicker from '@/components/ui/MyCalendar/MyDatePicker';


SyntaxHighlighter.registerLanguage('javascript', js);

const GuideDatepicker: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>

        <Box bgcolor="#60584c" padding="1em" marginBottom="1em">
          <Typography variant='h1' fontWeight={800} color="#ffbc00">Datepicker</Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap="1em" border="1px solid #ddd" padding="2em 3em" marginBottom="1em">
          <Box display="flex" flexDirection="column" gap="1em">
            <Typography variant='h2' fontWeight={800}>Basic Datepicker</Typography>
            {/* // */}
            <MyDatePicker />
            {/* // */}
          </Box>
        </Box>

      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

const codeString = `
  <MyDatePicker />
  
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

const GuideDatepickerPage: React.FC = () => {

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
      <GuideDatepicker />
      <CodeBlockWithCopy />
    </Box>
  );
};

export default GuideDatepickerPage;