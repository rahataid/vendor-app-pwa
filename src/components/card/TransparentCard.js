import { Card } from '@mui/material';
import PropTypes from 'prop-types';

const TransparentCard = ({
  children,
  border = '0px',
  backgroundColor = 'rgba(255,255,255,0.3)',
  backdropFilter = 'blur(50px)',
  ...props
}) => (
  <Card
    sx={{
      border,
      backgroundColor,
      backdropFilter,
    }}
    {...props}
  >
    {children}
  </Card>
);

TransparentCard.propTypes = {
  children: PropTypes.children,
  props: PropTypes.object,
  border: PropTypes.string,
  backgroundColor: PropTypes.string,
  backdropFilter: PropTypes.string,
};

export default TransparentCard;
