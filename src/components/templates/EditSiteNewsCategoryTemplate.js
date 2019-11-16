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

class EditSiteNewsCategoryTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { Description } = this.props.model;

    this.state = {
      Description
    };
  }

  isEditAction() {
    return this.props.model && this.props.model.Id;
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, onConfirm, i10n } = this.props;
    const { Description } = this.state;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {this.props.modelId
              ? i10n['marketing.site-news-category.title.edit']
              : i10n['marketing.site-news-category.title.new']}
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SimpleTextField
                required
                maxLength="100"
                id="Description"
                name="Description"
                label={i10n['global.description']}
                fullWidth
                value={Description}
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

export const EditSiteNewsCategoryTemplate = withLocalization(
  withStyles(styles)(EditSiteNewsCategoryTemplateComponent)
);
