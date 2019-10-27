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
  strong: {
    fontWeight: 'bold'
  },
  paragraph: {
    marginTop: theme.spacing(1)
  }
});

class PrivacyPolicyTemplateComponent extends PureComponent {
  render() {
    const { classes, i10n } = this.props;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <div>
            <Paper className={classes.paperRoot}>
              <Typography variant="h3" component="h3">
                {i10n['privacy-policy.title']}
              </Typography>
              <Typography component="p" className={classes.strong}>
                {i10n['privacy-policy.text-intro']}
              </Typography>
              <Typography component="p" className={classes.paragraph}>
                {i10n['privacy-policy.text-01.txt'].replace('\\n', '\n\n')}
              </Typography>
              <Typography component="p" className={classes.paragraph}>
                {i10n['privacy-policy.text-02.txt'].replace('\\n', '\n\n')}
              </Typography>
              <Typography component="p" className={classes.paragraph}>
                {i10n['privacy-policy.text-03.txt'].replace('\\n', '\n\n')}
              </Typography>
              <Typography component="p" className={classes.paragraph}>
                {i10n['privacy-policy.text-04.txt'].replace('\\n', '\n\n')}
              </Typography>
              <Typography component="p" className={classes.paragraph}>
                {i10n['privacy-policy.text-05.txt'].replace('\\n', '\n\n')}
              </Typography>
              <Typography component="p" className={classes.paragraph}>
                {i10n['privacy-policy.text-06.txt'].replace('\\n', '\n\n')}
              </Typography>
            </Paper>
          </div>
        </div>
      </Container>
    );
  }
}

export const PrivacyPolicyTemplate = withStyles(styles)(
  withLocalization(PrivacyPolicyTemplateComponent)
);
