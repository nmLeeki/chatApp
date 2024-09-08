import styled from 'styled-components'

export const StyledChat = styled.div``

// @chatscope/chat-ui-kit-react
export const StyledChatBox = styled.div<{ isChatGPT: boolean }>``

export const StyledChatDate = styled.div`
  .cs-message-separator {
    color: #4e473f;
    background-color: transparent;
    font-size: 0.8571em;
    &:not(:first-child) {
      margin-top: 0;
    }
    &:before,
    &:after {
      display: block;
      background-color: #e7e3e0;
    }
  }
`

export const StyledChatStart = styled.div`
  .cs-message-separator {
    color: #4e473f;
    background-color: transparent;
    font-size: 0.8571em;
    &:not(:first-child) {
      margin-top: 0;
    }
    &:before,
    &:after {
      background-color: #e7e3e0;
    }
  }
`

export const StyledChatBubble = styled.div<{ isChatGPT: boolean }>`  
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ isChatGPT }) => (isChatGPT ? 'row' : 'row-reverse')};

  .cs-avatar{
    display: block;
    &.cs-avatar--md {
      width: 2.2857em;
      height: 2.2857em;
      min-width: 2.2857em;
      min-height: 2.2857em;
  }
`

export const StyledChatText = styled.div`
  width: 100%;
  .MuiTypography-root {
    display: block;
    margin-top: 0.2857em;
    color: #272420;
    font-weight: 500;
    &:first-child {
      font-size: 1.1429em;
    }
    &:last-child {
      font-size: 1.4286em;
    }
  }
`

export const StyledChatMessage = styled.div<{ isChatGPT: boolean }>`
  display: flex;
  justify-content: ${({ isChatGPT }) => (isChatGPT ? 'flex-start' : 'flex-end')};
  width: 100%;
  margin-top: 0.8571em;
  font-size: ${({ isChatGPT }) => (isChatGPT ? '1em' : '1.2857em')};
  font-weight: ${({ isChatGPT }) => (isChatGPT ? '300' : '700')};
`

export const StyledChatTime = styled.div`
  margin-top: 0.8571em;
  .cs-message-separator {
    display: inline-flex;
    align-items: center;
    margin-top: 0;
    color: #4e473f;
    background-color: transparent;
    font-size: 0.7143em;
    &:not(:first-child) {
      margin-top: 0;
    }
    &:before,
    &:after {
      display: none;
    }
  }
`

export const StyledTypingIndicator = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.8571em;

  .MuiTypography-root {
    font-size: 1.1429em;
    font-weight: 700;
    background: linear-gradient(90deg, #de6262 0%, #ffb88c 100%);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: moveGradient 2.5s ease-in-out infinite;
  }

  @keyframes moveGradient {
    0% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 50% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    75% {
      background-position: 50% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`

export default StyledChat
