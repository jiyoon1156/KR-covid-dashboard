import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import useStyles from '../styles/Theme';

// eslint-disable-next-line react/prop-types
const ApplicationBar = ({ open, handleDrawerOpen }) => {
  const classes = useStyles();

  return (
    <AppBar position="absolute" className={clsx(classes.appBar, !open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, !open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          South Korea COVID-19 Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
