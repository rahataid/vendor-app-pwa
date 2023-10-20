import Headerbreadcrumbs from '@components/HeaderBreadcrumbs';
import Iconify from '@components/iconify';
import { useSettingsContext } from '@components/settings';
import { SPACING } from '@config';
import { Card, IconButton, Container as MuiContainer, Stack } from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import PropTypes from 'prop-types';

const ContainerComponent = ({ children, title, action, breadcrumbLinks, nocard = false, showTitleHeading = true }) => {
  const { themeStretch } = useSettingsContext();

  return (
    <Stack style={{ height: '100%', flex: 1 }}>
      {' '}
      <MuiContainer maxWidth={themeStretch ? false : 'lg'} style={{ flex: 1, display: 'flex' }}>
        <Headerbreadcrumbs
          heading={
            showTitleHeading &&
            title && (
              <Stack direction="row" alignItems="center" spacing={1} pl={2} mt={SPACING.GRID_SPACING}>
                <IconButton
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  <Iconify icon="material-symbols:arrow-back-ios-rounded" />
                </IconButton>
                {title}
              </Stack>
            )
          }
          links={[{ name: '', href: PATH_DASHBOARD.root }, ...breadcrumbLinks]}
          action={action}
        />
        {nocard ? <Stack style={{ flex: 1 }}>{children}</Stack> : <Card sx={{ p: 2 }}>{children}</Card>}
      </MuiContainer>
    </Stack>
  );
};
ContainerComponent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  action: PropTypes.node,
  breadcrumbLinks: PropTypes.array,
  nocard: PropTypes.bool,
  showTitleHeading: PropTypes.bool,
};

export default ContainerComponent;
