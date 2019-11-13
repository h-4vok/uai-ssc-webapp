import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ChatConversationBubble } from '../atoms';

const useStyles = makeStyles(theme => ({
  chatBoxGrid: {
    border: 1,
    borderRadius: 2,
    boxShadow: '0 2px 4px 1px #1976D2',
    padding: '0 30px',
    height: 500,
    overflow: 'auto'
  }
}));

const buildBubbles = conversation => {
  const output = conversation.Messages.map(message => {
    const bubbleProps = {
      author: message.AuthorName,
      isMine: message.IsMine,
      date: new Date(message.CreatedDate),
      message: message.Content
    };

    console.log({ bubbleProps });

    return <ChatConversationBubble {...bubbleProps} />;
  });

  return output;
};

export function ChatBox(props) {
  const classes = useStyles();

  return (
    <Grid id={props.id} className={classes.chatBoxGrid}>
      {buildBubbles(props.conversation)}
    </Grid>
  );
}
