import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from '../../hooks/use-responsive';

import { bgBlur } from '../../theme/css';

import Iconify from '../../components/iconify';

import { NAV, HEADER } from './config-layout';

import { FilterList } from '@mui/icons-material';
import ShiftPopover from './common/shift-popover';

// ----------------------------------------------------------------------

export default function ShiftsHeader({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 1024);

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}


      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
       <FilterList  style={{fontSize:"2rem"}} className=' text-slate-400'/>
        <ShiftPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        background:"#F2F5F7",       
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

ShiftsHeader.propTypes = {
  onOpenNav: PropTypes.func,
};
