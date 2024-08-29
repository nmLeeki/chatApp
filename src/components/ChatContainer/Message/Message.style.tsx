import styled from 'styled-components'

export const StyledChatBox = styled.div<{ isChatGPT: boolean }>`
  display: flex;
  flex-direction: ${({ isChatGPT }) => (isChatGPT ? 'row' : 'row-reverse')};
  margin-bottom: 10px;
`

export default StyledChatBox
