import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Typography, Paper } from '@material-ui/core';
import withLocalization from '../../localization/withLocalization';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paperRoot: {
    padding: theme.spacing(3, 4),
    margin: theme.spacing(2),
    minWidth: 500
  },
  tosTitle: {
    fontWeight: 'bold'
  }
});

class TermsOfServiceTemplateComponent extends PureComponent {
  render() {
    const { classes, i10n } = this.props;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <div>
            <Paper className={classes.paperRoot}>
              <Typography variant="h3" component="h3">
                {i10n['tos.title']}
              </Typography>
              <Typography component="p">{i10n['tos.text-intro']}</Typography>
              <Typography component="p" className={classes.tosTitle}>
                {i10n['tos.text-01.title']}
              </Typography>
              <Typography component="p">
                {i10n['tos.text-01.txt'].replace('\\n', '\n\n')}
              </Typography>
              <Typography component="p" className={classes.tosTitle}>
                {i10n['tos.text-02.title']}
              </Typography>
              <Typography component="p">
                {i10n['tos.text-02.txt'].replace('\\n', '\n\n')}
              </Typography>
              <Typography component="p" className={classes.tosTitle}>
                {i10n['tos.text-03.title']}
              </Typography>
              <Typography component="p">
                {i10n['tos.text-03.txt'].replace('\\n', '\n\n')}
              </Typography>
              <Typography component="p" className={classes.tosTitle}>
                {i10n['tos.text-04.title']}
              </Typography>
              <Typography component="p">
                {i10n['tos.text-04.txt'].replace('\\n', '\n\n')}
              </Typography>
              <Typography component="p" className={classes.tosTitle}>
                {i10n['tos.text-05.title']}
              </Typography>
              <Typography component="p">
                {i10n['tos.text-05.txt'].replace('\\n', '\n\n')}
              </Typography>
              <Typography component="p" className={classes.tosTitle}>
                {i10n['tos.text-06.title']}
              </Typography>
              <Typography component="p">
                {i10n['tos.text-06.txt'].replace('\\n', '\n\n')}
              </Typography>
            </Paper>
          </div>
        </div>
      </Container>
    );
  }
}

export const TermsOfServiceTemplate = withStyles(styles)(
  withLocalization(TermsOfServiceTemplateComponent)
);
