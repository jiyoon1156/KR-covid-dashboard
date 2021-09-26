/* eslint-disable no-unused-vars */
import React from 'react';
import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Drawer from '@material-ui/core/Drawer';
import Chart from './LinearChart';
import RatioPieChart from './RatioPieChart';
import VaccineChart from './VaccineChart';
import TopNumbers from './TopNumbers';
import useStyles from '../styles/Theme';
import Copyright from './Copyright';
import Drawers from './Drawers';
import ApplicationBar from './ApplicationBar';

const Dashboard = ({ data }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(false);
  };
  const handleDrawerClose = () => {
    setOpen(true);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightTop = clsx(classes.paper, classes.fixedHeightTop);
  
  const totalVaccine = data.vaccine[data.vaccine.length-1];
  return (
    <div className={classes.root}>
      <CssBaseline />
      <ApplicationBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawers open={open} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper className={fixedHeightTop}>
                <TopNumbers title="Cases" number={data.composition.accumulatedConfirmed} />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={fixedHeightTop}>
                <TopNumbers title="Deaths" number={data.composition.deaths} />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={fixedHeightTop}>
                <TopNumbers title="Vaccine Doses Administered" number={totalVaccine.accumulateFirstCnt + totalVaccine.accumulateSecondCnt} />
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Chart data={data.daily}/>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <RatioPieChart data={data.composition}/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <VaccineChart data={data.vaccine}/>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
