import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import { fromI10n } from '../../lib/GlobalState';

const useStyles = makeStyles(() => ({
  publicationDate: {
    fontSize: 9,
    color: 'grey'
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  articleAuthor: {
    fontSize: 10
  },
  articleContent: {
    fontSize: 12,
    border: '0px'
  }
}));

export const BlogTemplate = ({ news, onSubscribeConfirm }) => {
  const classes = useStyles();

  return (
    <Container main maxWidth="md">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h3">{fromI10n('blog.page.title')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubscribeConfirm}
          >
            {fromI10n('blog.go-to-subscribe')}
          </Button>
        </Grid>
        {news.map(article => (
          <>
            <Grid item xs={12}>
              <Typography className={classes.articleTitle}>
                {article.Title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.publicationDate}>
                {article.PublicationDate}
              </Typography>
              <Typography className={classes.articleAuthor}>
                {fromI10n('blog.article-by')}
                {article.Author}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.articleContent}>
                <pre style={{ fontFamily: 'inherit' }}>{article.Content}</pre>
              </Typography>
              {/* <SimpleTextField
                className={classes.articleContent}
                required
                label=""
                fullWidth
                value={article.Content}
                readOnly
                multiline
                rows="1"
              /> */}
            </Grid>
          </>
        ))}
      </Grid>
    </Container>
  );
};
