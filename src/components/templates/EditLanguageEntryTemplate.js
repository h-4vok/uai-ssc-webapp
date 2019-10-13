import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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

class EditLanguageEntryTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { model } = this.props;
    const { Key, Translation } = model;

    this.state = {
      Key,
      Translation
    };
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onConfirm, onCancel, i10n } = this.props;
    const { Key, Translation } = this.state;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {i10n['configuration.editLanguageEntry.title']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                readonly
                label={i10n['configuration.editLanguageEntry.key']}
                fullWidth
                value={Key}
                InputProps={{ readOnly: true }}
              />
              <TextField
                required
                maxLength="500"
                id="Translation"
                name="Translation"
                label={i10n['configuration.editLanguageEntry.translation']}
                fullWidth
                multiline
                rowsMax="6"
                value={Translation}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onConfirm}
              >
                {i10n['configuration.editLanguageEntry.confirm']}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={onCancel}
              >
                {i10n['configuration.editLanguageEntry.cancel']}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export const EditLanguageEntryTemplate = withLocalization(
  withStyles(styles)(EditLanguageEntryTemplateComponent)
);
