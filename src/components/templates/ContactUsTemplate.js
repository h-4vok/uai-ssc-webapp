import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Typography, Paper, Link } from '@material-ui/core';
import withLocalization from '../../localization/withLocalization';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  paperRoot: {
    padding: theme.spacing(3, 4),
    margin: theme.spacing(2),
    minWidth: 500
  }
});

class ContactUsTemplateComponent extends PureComponent {
  render() {
    const { classes, i10n } = this.props;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <div>
            <Paper className={classes.paperRoot}>
              <Typography variant="h3" component="h3">
                {i10n['about-us.contact']}
              </Typography>
              <Typography component="p">{i10n['about-us.address']}</Typography>
              <Typography component="p">4317-2839 / 3849 / 3888</Typography>
              <Typography component="p">
                <Link href="mailto:info@ssc.com.ar">info@ssc.com.ar</Link>
              </Typography>
            </Paper>
          </div>
        </div>
      </Container>
    );
  }
}

export const ContactUsTemplate = withLocalization(
  withStyles(styles)(ContactUsTemplateComponent)
);
