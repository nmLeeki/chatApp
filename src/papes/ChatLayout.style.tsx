import styled from 'styled-components'


export const StyledMainCon = styled.div`
  .cs-main-container {
    position: relative;
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100vw;
    background-color: #fff;
    font-size: 1rem;
    width: 100vw;
    border: 0;
    overflow: hidden;
  }

  .ps .ps__rail-x:hover,
  .ps .ps__rail-y:hover,
  .ps .ps__rail-x:focus,
  .ps .ps__rail-y:focus,
  .ps__rail-x.ps--clicking,
  .ps__rail-y.ps--clicking,
  .ps--active-x>.ps__rail-x,
  .ps--active-y>.ps__rail-y {
    background-color: #fff;
  }

  .ps__rail-y:hover>.ps__thumb-y,
  .ps__rail-y:focus>.ps__thumb-y,
  .ps__rail-y.ps--clicking .ps__thumb-y,
  .ps__thumb-y {
    background-color: rgba(170, 103, 36, 0.08) !important;
  }

  .pc-left-menu {
    background-color: rgba(170, 103, 36, 0.08);

    .ps .ps__rail-x:hover,
    .ps .ps__rail-y:hover,
    .ps .ps__rail-x:focus,
    .ps .ps__rail-y:focus,
    .ps__rail-x.ps--clicking,
    .ps__rail-y.ps--clicking,
    .ps--active-x>.ps__rail-x,
    .ps--active-y>.ps__rail-y {
      background-color: rgba(170, 103, 36, 0.08);
    }
  }
  
`

export const StyledChatCon = styled.div`
  width: 100%;
`
export default StyledChatCon;
