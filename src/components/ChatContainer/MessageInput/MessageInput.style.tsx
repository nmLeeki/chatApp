import styled from 'styled-components'
import sendIcon from '../../../assets/images/icons/btn_send.svg'

export const StyledChatInput = styled.div`
  position: relative;
  padding-left: 4em;
  border-top: 1px solid #efe8e1;
  .cs-message-input {
    display: flex;
    align-items: center;
    height: 4em;
    background-color: #fff;
    border: 0;
    
    .cs-message-input__content-editor {
      font-size: 1.1429em;
    }
    .cs-message-input__content-editor-wrapper,
    .cs-message-input__content-editor-container,
    .cs-message-input__content-editor {
      background-color: transparent;
    }
    .cs-button {
      position: relative;
      color: #786f66;
      width: 3.4286em;
      height: 3.4286em;
      &:before { 
        content:'';
        display: block;
        position: absolute;
        top: 0.571em;
        left: 0.8571em;
        width: 2.2857em;
        height: 2.2857em;
        background: url(${sendIcon}) no-repeat;no-repeat;
        font-size: 1em;
      }
      &:focus {
        outline: 1px solid #222;
      }
      > svg {
        display: none;
      }
    }
  }
`

export const StyledAddBtn = styled.div`
  position: absolute;
  left: 0.5714em;
  top: 0.2857em;
  width: 3.4286em;
  height: 3.4286em;
  .MuiButtonBase-root {
    width: 3.4286em;
    height: 3.4286em;
  }
`

export default StyledChatInput
