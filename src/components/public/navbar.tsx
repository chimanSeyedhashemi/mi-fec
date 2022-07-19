import { ReactNode } from 'react';
import type { FC } from 'react';
import { AppBar, Box, MenuItem, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { navbarList } from './navbar-list';

export interface INavbarProps {
  rightComponent?: ReactNode;
  activePageLabel?: string;
}

const DashboardNavbarRoot = styled(AppBar)(() => ({
  backgroundColor: '#263238',
  borderBottomColor: '#263238',
  borderBottomStyle: 'solid',
  borderBottomWidth: 1,
  boxShadow: 'none',
}));

const NavLinkRoot = styled(NavLink)(() => ({
  textDecoration: 'none',
}));

export const Navbar: FC<INavbarProps> = ({ rightComponent, activePageLabel }) => {
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          width: {
            lg: `100%`,
          },
        }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}>
          {activePageLabel && (
            <MenuItem>
              <Typography variant="h6">{activePageLabel}</Typography>
            </MenuItem>
          )}
          {navbarList.map((item, index) =>
            item.path ? (
              <NavLinkRoot to={item.path} key={`__${index}__`}>
                <MenuItem disabled={item.disabled} sx={{ textDecoration: 'none', color: '#fff' }}>
                  {item.title}
                </MenuItem>
              </NavLinkRoot>
            ) : (
              <MenuItem key={`__${index}__`} disabled={item.disabled}>
                {item.title}
              </MenuItem>
            )
          )}

          <Box sx={{ flexGrow: 1 }} />
          {rightComponent}
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};
