import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useResponsive } from '../../hooks/use-responsive';

import { NAV, HEADER } from './config-layout';

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }) {
  const lgUp = useResponsive('up', 1024);
  
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight:1,
        display: 'flex',
        bgcolor:"#F2F5F7",
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
          position:"absolute",
          right:0,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
    }  

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
