import styled from 'styled-components'

interface LeftMenuProps {
  $isMenuOpen: boolean // transient prop
  $isClosing: boolean // transient prop
}

export const StyledLeftMenu = styled.div<LeftMenuProps>`
  .btn-close,
  .btn-toggle {
    width: 3.4286em;
    height: 3.4286em;
    margin-left: 0.3571em;
  }
  .cs-sidebar--left {
    padding: 1.1429em;
    transition: width 0.5s ease-in-out;
    background-color: transparent;
    width: ${({ $isClosing, $isMenuOpen }) => ($isClosing ? '4.8571em' : $isMenuOpen ? '20em' : '4.8571em')};
  }

  .cs-conversation-list {
    padding-top: 2.2857em;
    height: calc(100% - 5.5em);
    ul {
      display: flex;
      flex-direction: column;
      gap: 0.875em;
      li {
        &:first-child {
          margin-top: 0;
        }
      }
    }
    .cs-conversation {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      background-color: transparent;
      &:hover {
        background-color: transparent;
      }
      .cs-conversation__content {
        margin-right: 0;
      }
      .cs-conversation__name {
        color: #333;
      }
      .MuiListItemButton-root {
        display: flex;
        align-items: flex-start;
        align-items: center;
        padding: 0;

        &:hover {
          background-color: transparent;
        }
      }
    }
    .cs-conversation.cs-conversation--active {
      background-color: transparent;
      .cs-conversation__name {
        color: #333;
      }
    }
  }

  .ps .ps__rail-x:hover,
  .ps .ps__rail-y:hover,
  .ps .ps__rail-x:focus,
  .ps .ps__rail-y:focus,
  .ps__rail-x.ps--clicking,
  .ps__rail-y.ps--clicking,
  .ps--active-x > .ps__rail-x,
  .ps--active-y > .ps__rail-y,
  .ps__rail-y:hover > .ps__thumb-y,
  .ps__rail-y:focus > .ps__thumb-y,
  .ps__rail-y.ps--clicking .ps__thumb-y {
    background-color: #f1ede8;
  }
  .ps__thumb-y {
    background-color: #fff;
  }

  @media (min-width: 768px) {
    .cs-sidebar--left {
      padding: 1.1429em;
    }

    .cs-conversation {
      padding: 0 0.2857em;
    }
  }
`

export const StyledUserInfo = styled.div<{ isMenuOpen: boolean; isClosing: boolean }>`
  display: flex;
  .cs-avatar.cs-avatar--md {
    min-width: 2.8571em;
    min-height: 2.8571em;
    width: 2.8571em;
    height: 2.8571em;
    overflow: hidden;
  }
`

export const StyledUserNm = styled.div<{ isMenuOpen: boolean; isClosing: boolean }>`
  display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
  flex-direction: column;
  margin-left: 0.5714em;
  min-width: 6.0714em;
  .MuiTypography-root {
    transition: opacity 0.5s ease-in-out;
  }
  .MuiTypography-body2 {
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
    min-width: 9.0714em;
    font-size: 0.8571em;
    color: #a1a1a1;
  }
`

export const StyledListBot = styled.div<{ isMenuOpen: boolean; isClosing: boolean }>`
  display: flex;
  gap: 0.8em;
  align-items: center;
  min-width: 15.5em;
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
  transform-origin: left;
  .MuiButtonBase-root {
    justify-content: flex-start;
    padding: 0;
  }
  .cs-avatar.cs-avatar--md {
    min-width: 2.2857em;
    min-height: 2.2857em;
    width: 2.2857em;
    height: 2.2857em;
  }
  .MuiTypography-root {
    overflow: hidden;
    margin-left: 0.8em;
    text-align: left;
    font-weight: 700;
  }
`

export const StyledFavorite = styled.div`
  .MuiButtonBase-root {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.7143em;
    height: 1.7143em;
    padding: 0.2857em;
    margin-right: 0;
    margin-left: 0;
    background-color: #fff;
    border-radius: 50%;
  }
`

export default StyledLeftMenu
