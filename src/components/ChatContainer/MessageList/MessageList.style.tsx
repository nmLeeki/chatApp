import styled from 'styled-components'

export const StyledChatList = styled.div`
  height: calc(100% - 7em);
  .cs-message-list {
    background-color: #f2f0ee;
    color: #222;
  }
`

// @mui/material
export const StyledTopButton = styled.div`
  position: fixed;
  right: 2em;
  bottom: 5.5em;
  width: 2.8571em;
  height: 2.8571em;
  transform: rotate(90deg);
  border: 1px solid #222;
  border-radius: 50%;
  > button {
    width: 100%;
    height: 100%;
    background-color: #f2f0ee;
  }
`

export default StyledChatList
