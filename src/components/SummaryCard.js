import PropTypes from 'prop-types';
// @mui
import { Box, Card, LinearProgress, Stack, Typography } from '@mui/material';
// utils
// components
import Iconify from '@components/iconify';

// ----------------------------------------------------------------------

SummaryCard.propTypes = {
  loading: PropTypes.bool,
  sx: PropTypes.object,
  chart: PropTypes.object,
  color: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  total: PropTypes.number,
  percent: PropTypes.number,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default function SummaryCard({ title, total, icon, subtitle, color = 'primary', sx, loading, ...other }) {
  if (loading)
    return (
      <Card
        sx={{
          width: 1,
          boxShadow: 0,
          color: (theme) => theme.palette[color].darker,
          bgcolor: (theme) => theme.palette[color].lighter,
          ...sx,
        }}
        {...other}
      >
        <Iconify
          icon={icon}
          sx={{
            p: 1.5,
            top: 24,
            right: 24,
            width: 48,
            height: 48,
            borderRadius: '50%',
            position: 'absolute',
            //color: 'grey',
            color: (theme) => theme.palette[color].dark,
            //bgcolor: (theme) => theme.palette[color].dark,
          }}
        />

        <Stack spacing={1} sx={{ p: 3 }}>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="h3" sx={{ color: 'rgba(0,0,0,0)' }}>
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
              .<LinearProgress color="primary" sx={{ width: '100%' }} />.
            </Stack>
          </Typography>

          <Box component="span" sx={{ opacity: 0.72, typography: 'body2' }}>
            {subtitle}
          </Box>
        </Stack>
      </Card>
    );

  if (!loading)
    return (
      <Card
        sx={{
          width: 1,
          boxShadow: 0,
          color: (theme) => theme.palette[color].darker,
          bgcolor: (theme) => theme.palette[color].lighter,
          ...sx,
        }}
        {...other}
      >
        <Iconify
          icon={icon}
          sx={{
            p: 1.5,
            top: 24,
            right: 24,
            width: 48,
            height: 48,
            borderRadius: '50%',
            position: 'absolute',
            //color: 'grey',
            color: (theme) => theme.palette[color].dark,
            //bgcolor: (theme) => theme.palette[color].dark,
          }}
        />

        <Stack spacing={1} sx={{ p: 3 }}>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="h3">{total}</Typography>
          <Box component="span" sx={{ opacity: 0.72, typography: 'body2' }}>
            {subtitle}
          </Box>
        </Stack>
      </Card>
    );
}
