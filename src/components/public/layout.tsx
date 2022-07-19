import { Navbar, INavbarProps } from './navbar';
import type { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
interface IProps {
  children?: JSX.Element;
  NavbarProps?: INavbarProps;
}

const LayoutRoot = styled('div')(() => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
}));

export const Layout: FC<IProps> = ({ children, NavbarProps }) => {
  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}>
          {children}
        </Box>
      </LayoutRoot>
      <Navbar {...NavbarProps} />
    </>
  );
};
