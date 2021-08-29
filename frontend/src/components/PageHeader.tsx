import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() =>
    createStyles({
        title: {
            flexGrow: 1,
        },
    }),
);

export default function PageHeader() {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    ANSR - Hackerearth challenge
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
