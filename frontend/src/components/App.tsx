import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid } from '@material-ui/core';
import HomePage from './HomePage';
import PageHeader from './PageHeader';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    mainContainer: {
      marginTop: 16,
      paddingBottom: 100,
    },
  }),
);

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PageHeader />
      <CssBaseline />
      <Grid container direction="column" className={classes.mainContainer}>
        <Grid item container>
          <Grid item xs={1} sm={1} />
          <Grid item xs={10} sm={10}>
            <Router>
              <Switch>
                <Route path="/:productID">
                  <ProductDetailPage />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            </Router>
          </Grid>
          <Grid item xs={1} sm={1} />
        </Grid>
      </Grid>
    </div>
  );
}
