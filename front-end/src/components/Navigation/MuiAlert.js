import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { propTypes } from 'react-bootstrap/esm/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ActionAlerts(props) {
  const classes = useStyles();

  return (
    <Alert onClose={() => {props.hideAlert(false)}}>You've joined the Match!</Alert>
  );
}