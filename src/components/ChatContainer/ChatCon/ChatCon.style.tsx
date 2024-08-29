import styled from 'styled-components'

// @chatscope/chat-ui-kit-react
export const StyledChatCon = styled.div`
  width: 100%;

  .cs-message-list {
    background-color: #fbf9f7;
    color: #222;
    .cs-message--outgoing {
      .cs-message__content {
        background-color: #786f66;
        color: #fff;
      }
    }

    .cs-message--incoming .cs-message__content {
      background-color: transparent;
      color: #222;
    }
    .cs-message__content {
      font-size: 1em;
    }
    .cs-message-separator {
      align-items: flex-end;
      margin-top: 0.5em;
      color: #4e473f;
      background-color: transparent;
      font-size: 0.75em;
    }
    .ps--active-x > .ps__rail-x,
    .ps--active-y > .ps__rail-y {
      display: none;
    }
  }

  .cs-message-input {
    background-color: #fff;
    border: 0;
    border-top: 1px solid rgba(000, 000, 000, 0.1);
    .cs-message-input__content-editor-wrapper,
    .cs-message-input__content-editor-container,
    .cs-message-input__content-editor {
      background-color: transparent;
    }
    .cs-button {
      color: #786f66;
    }
  }
`

// @chatscope/chat-ui-kit-react
export const StyledChatBox = styled.div<{ isChatGPT: boolean }>`
  display: flex;
  flex-direction: ${({ isChatGPT }) => (isChatGPT ? 'row' : 'row-reverse')};
  margin-bottom: 10px;
`

// @chatscope/chat-ui-kit-react
export const StyledTypingIndicator = styled.div`
  .cs-typing-indicator {
    display: flex;
    align-items: center;
    right: 0;
    width: 100%;
    height: 1.5em;
    padding: 1em;
    background-color: #5a5a5a;
    opacity: 0.9;
    .cs-typing-indicator__text {
      font-size: 1.2em;
      font-weight: 800;
      color: #fff;
    }
  }
`

// @chatscope/chat-ui-kit-react
export const StyledTypingIndicatorComplete = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  align-items: center;
  width: 100%;
  height: 3.125em;
  .cs-typing-indicator {
    display: flex;
    align-items: center;
    right: 0;
    width: 100%;
    height: 1.5em;
    padding: 1em;
    background-color: #5a5a5a;
    opacity: 0.9;
    .cs-typing-indicator__text {
      font-size: 1.2em;
      font-weight: 800;
      background: linear-gradient(90deg, #f0e68c 0%, #00fa9a 100%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }
  .MuiButton-root {
    position: absolute;
    right: 0;
    color: #fff;
  }
`

export default StyledChatCon
