import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import withLocalization from '../../localization/withLocalization';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class ReadLogTemplateComponent extends PureComponent {
  render() {
    const { classes, model, i10n } = this.props;
    const { Id, LoggedDate, UserReference, ClientId, Message } = model;
    const { Description: EventTypeDescription } = model.EventType;

    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {i10n['security.read-log.title']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                InputProps={{ readOnly: true }}
                label={i10n['security.read-log.id']}
                fullWidth
                value={Id}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{ readOnly: true }}
                label={i10n['security.read-log.event-type-description']}
                fullWidth
                value={EventTypeDescription}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputProps={{ readOnly: true }}
                label={i10n['security.read-log.date']}
                fullWidth
                value={LoggedDate}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputProps={{ readOnly: true }}
                label={i10n['security.read-log.user']}
                fullWidth
                value={UserReference}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputProps={{ readOnly: true }}
                label={i10n['security.read-log.client-id']}
                fullWidth
                value={ClientId}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{ readOnly: true }}
                label={i10n['security.read-log.message']}
                fullWidth
                multiline
                rowsMax="15"
                value={Message}
              />
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export const ReadLogTemplate = withLocalization(
  withStyles(styles)(ReadLogTemplateComponent)
);
