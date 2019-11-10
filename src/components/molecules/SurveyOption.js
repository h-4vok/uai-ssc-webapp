/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    cursor: 'pointer'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 18
  },
  pos: {
    marginBottom: 12
  }
});

export function SurveyOption(props) {
  const classes = useStyles();
  const [raised, setRaised] = React.useState(false);

  return (
    <Card
      className={classes.card}
      onClick={props.onClick}
      raised={raised}
      onMouseOver={() => setRaised(true)}
      onMouseOut={() => setRaised(false)}
    >
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.label}
        </Typography>
      </CardContent>
    </Card>
  );
}
