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

class EditUnitOfMeasureTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { Code, DefaultDescription } = this.props.model;

    this.state = {
      Code,
      DefaultDescription
    };
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onConfirm, i10n } = this.props;
    const { Code, DefaultDescription } = this.state;

    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {i10n['configuration.editUnitOfMeasure.title.new']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                required
                inputProps={{ maxLength: 10 }}
                id="Code"
                name="Code"
                label={i10n['global.code']}
                fullWidth
                value={Code}
                onChange={this.onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                inputProps={{ maxLength: 300 }}
                id="DefaultDescription"
                name="DefaultDescription"
                label={i10n['global.description']}
                fullWidth
                value={DefaultDescription}
                onChange={this.onInputChange}
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

export const EditUnitOfMeasureTemplate = withLocalization(
  withStyles(styles)(EditUnitOfMeasureTemplateComponent)
);
