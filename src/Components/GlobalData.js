import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: theme.spacing(16),
    },
  },
}));

const useStylesTypography = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});

export default function GlobalData() {
  const classes = useStyles();
  const classTypography = useStylesTypography();

  const [globalData, setGlobalData] = useState();
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    async function fetchGlobalData() {
      setDataLoading(true);
      const apiResponse = await fetch(
        'https://api.thevirustracker.com/free-api?global=stats'
      );
      console.log(apiResponse);
      const dataFromApi = await apiResponse.json();
      console.log(dataFromApi);
      setGlobalData(dataFromApi);
      setDataLoading(false);
    }
    fetchGlobalData();
  }, []);

  const loading = 'Loading';

  if (dataLoading) {
    return (
      <div className={classes.root}>
        <Paper elevation={3}>
          <div className={classTypography.root}>
            <Typography variant='h4' gutterBottom style={{ color: 'black' }}>
              {loading}
            </Typography>
            <Typography
              variant='subtitle2'
              gutterBottom
              style={{ color: 'black', fontWeight: 'bold' }}
            >
              Global Data as of Today
            </Typography>
          </div>
        </Paper>
        <Paper elevation={3}>
          <div className={classTypography.root}>
            <Typography variant='h4' gutterBottom style={{ color: 'orange' }}>
              {loading}
            </Typography>
            <Typography
              variant='subtitle2'
              gutterBottom
              style={{ color: 'orange', fontWeight: 'bold' }}
            >
              Active
            </Typography>
          </div>
        </Paper>
        <Paper elevation={3}>
          <div className={classTypography.root}>
            <Typography variant='h4' gutterBottom style={{ color: 'green' }}>
              {loading}
            </Typography>
            <Typography
              variant='subtitle2'
              gutterBottom
              style={{ color: 'green', fontWeight: 'bold' }}
            >
              Recovered
            </Typography>
          </div>
        </Paper>
        <Paper elevation={3}>
          <div className={classTypography.root}>
            <Typography variant='h4' gutterBottom style={{ color: 'red' }}>
              {loading}
            </Typography>
            <Typography
              variant='subtitle2'
              gutterBottom
              style={{ color: 'red', fontWeight: 'bold' }}
            >
              Fatalities
            </Typography>
          </div>
        </Paper>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div className={classTypography.root}>
          <Typography variant='h4' gutterBottom style={{ color: 'black' }}>
            <NumberFormat
              value={
                globalData &&
                globalData.results &&
                globalData.results[0].total_cases
              }
              displayType={'text'}
              thousandSeparator={true}
            />
          </Typography>
          <Typography
            variant='subtitle2'
            gutterBottom
            style={{ color: 'black', fontWeight: 'bold' }}
          >
            Global Data as of Today
          </Typography>
        </div>
      </Paper>
      <Paper elevation={3}>
        <div className={classTypography.root}>
          <Typography variant='h4' gutterBottom style={{ color: 'orange' }}>
            <NumberFormat
              value={
                globalData &&
                globalData.results &&
                globalData.results[0].total_unresolved +
                  globalData.results[0].total_active_cases
              }
              displayType={'text'}
              thousandSeparator={true}
            />
          </Typography>
          <Typography
            variant='subtitle2'
            gutterBottom
            style={{ color: 'orange', fontWeight: 'bold' }}
          >
            Active
          </Typography>
        </div>
      </Paper>
      <Paper elevation={3}>
        <div className={classTypography.root}>
          <Typography variant='h4' gutterBottom style={{ color: 'green' }}>
            <NumberFormat
              value={
                globalData &&
                globalData.results &&
                globalData.results[0].total_recovered
              }
              displayType={'text'}
              thousandSeparator={true}
            />
          </Typography>
          <Typography
            variant='subtitle2'
            gutterBottom
            style={{ color: 'green', fontWeight: 'bold' }}
          >
            Recovered
          </Typography>
        </div>
      </Paper>
      <Paper elevation={3}>
        <div className={classTypography.root}>
          <Typography variant='h4' gutterBottom style={{ color: 'red' }}>
            <NumberFormat
              value={
                globalData &&
                globalData.results &&
                globalData.results[0].total_deaths
              }
              displayType={'text'}
              thousandSeparator={true}
            />
          </Typography>
          <Typography
            variant='subtitle2'
            gutterBottom
            style={{ color: 'red', fontWeight: 'bold' }}
          >
            Fatalities
          </Typography>
        </div>
      </Paper>
    </div>
  );
}
