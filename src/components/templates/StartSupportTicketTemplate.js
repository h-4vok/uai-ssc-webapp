import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withLocalization from '../../localization/withLocalization';
import { SimpleTextField } from '../atoms';

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

class StartSupportTicketTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { Subject, Content } = this.props.model;

    this.state = {
      Subject,
      Content
    };
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onConfirm, i10n } = this.props;
    const { Subject, Content } = this.state;

    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {i10n['start-support-ticket.page.title']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SimpleTextField
                required
                maxLength="200"
                id="Subject"
                name="Subject"
                label={i10n['support-ticket.model.subject']}
                fullWidth
                value={Subject}
                onChange={this.onInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <SimpleTextField
                required
                maxLength="8000"
                id="Content"
                name="Content"
                label={i10n['support-ticket.model.content']}
                fullWidth
                value={Content}
                onChange={this.onInputChange}
                multiline
                rows="6"
                rowsMax="15"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onConfirm}
              >
                {i10n['global.confirm']}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export const StartSupportTicketTemplate = withLocalization(
  withStyles(styles)(StartSupportTicketTemplateComponent)
);
