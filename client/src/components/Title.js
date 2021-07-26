import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Title = ({ children }) => (
  <Typography component="h2" variant="h6" color="primary" align="center">
    {children}
  </Typography>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
