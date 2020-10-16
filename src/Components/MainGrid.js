import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//Import GlobalData
import GlobalData from './GlobalData';
import Chart from './Chart';
import { fetchData } from '../Api/index';
import CountryData from './CountryData';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function MainGrid() {
  const [data, myData] = useState({});
  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchData();
      console.log('main grid data', initialDailyData);
      myData(initialDailyData);
    };

    fetchMyAPI();
  }, []);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <GlobalData />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <CountryData />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Chart data={data} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
