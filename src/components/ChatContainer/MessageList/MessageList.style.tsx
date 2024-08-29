import styled from 'styled-components'

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

export default StyledTypingIndicator
