import React from 'react';
// import Link from '@material-ui/core/Link';
// import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Title from './Title';

const TopNumbers = ({ title, number }) => {
  // const classes = useStyles();
  return (
    <>
      <Title>{title}</Title>
      <Typography component="p" variant="h4">
        {number}
      </Typography>
    </>
  );
};

TopNumbers.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export default TopNumbers;
