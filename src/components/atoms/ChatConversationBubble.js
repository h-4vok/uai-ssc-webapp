import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  bubbleContainer: {
    width: '100%'
  },
  bubbleSubContainer: {
    width: '80%'
  },
  bubble: {
    borderRadius: 5,
    border: 1,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    width: '100%',
    padding: '15px 0'
  },
  bubbleFromMe: {
    background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)'
  },
  bubbleFromOther: {
    background: 'linear-gradient(45deg, #DCF8C6 30%, #B4CDA7 90%)'
  },
  bubbleText: {
    color: theme.palette.common.black,
    fontSize: 12,
    border: 0,
    margin: '0 20px'
  }
}));

export function ChatConversationBubble(props) {
  const classes = useStyles();
  let bubbleClass = classes.bubble;
  let justify = '';

  if (props.isMine) {
    bubbleClass += ` ${classes.bubbleFromMe}`;
    justify = 'flex-start';
  } else {
    bubbleClass += ` ${classes.bubbleFromOther}`;
    justify = 'flex-end';
  }

  const senderText = `${
    props.author
  } - ${props.date.getFullYear()}/${props.date.getMonth()}/${props.date.getDay()}`;

  return (
    <Grid item container xs={12} direction="row" justify={justify}>
      <Box mb={1} mt={1} className={classes.bubbleSubContainer}>
        <Box className={classes.senderBox}>
          <Typography>{senderText}</Typography>
        </Box>
        <Box className={bubbleClass}>
          <Typography className={classes.bubbleText}>
            <pre style={{ fontFamily: 'inherit' }}>{props.message}</pre>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
