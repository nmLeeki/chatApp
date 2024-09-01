import { Drawer } from '@mui/material';
import styled from 'styled-components';


export const StyledDrawerHeader = styled.div`
  position:relative;
  .MuiIconButton-root {
    position:absolute;
    right:0.625em;
    top:0.625em;
  }
    .MuiTypography-root{
      padding:1.6em 1em 1em 1em
    }
`;

export const StyledDrawerBody = styled.div`
  .MuiList-root {
    display:flex;
    padding:0;
    flex-wrap:wrap;
    .MuiListItem-root{
      width:50%;
      .MuiButtonBase-root {
        display:flex;
        flex-direction:column;
      }
    }
  }
`;

export const StyledBottomMenu = styled(Drawer)`
  
`;

export default StyledBottomMenu;
