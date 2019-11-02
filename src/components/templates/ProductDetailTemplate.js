import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import withLocalization from '../../localization/withLocalization';
import { PricingCard } from '../molecules';

const styles = theme => ({
  boldParagraph: {
    fontWeight: 'bold',
    marginRight: theme.spacing(3)
  },
  commentParagraph: {
    fontSize: 12
  },
  commentGrid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
});

class ProductDetailTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const normalizedCode = this.props.planCode.replace('pricing-plan--', '');

    this.state = {
      product: this.buildProduct(this.props.i10n, normalizedCode)
    };
  }

  buildProduct = (i10n, descriptor) => ({
    title: i10n[`pricing-plan.${descriptor}.title`],
    code: `pricing-plan--${descriptor}`,
    subheader: i10n[`pricing-plan.${descriptor}.subheader`],
    price: i10n[`pricing-plan.${descriptor}.price`],
    billFrequency: i10n[`pricing-plan.${descriptor}.billFrequency`],
    planDescription: i10n[`pricing-plan.${descriptor}.planDescription`],
    patientSamplesDescription:
      i10n[`pricing-plan.${descriptor}.patientSamplesDescription`],
    controlSamplesDescription:
      i10n[`pricing-plan.${descriptor}.controlSamplesDescription`],
    userAccountsDescription:
      i10n[`pricing-plan.${descriptor}.userAccountsDescription`],
    runExecutionsDescription:
      i10n[`pricing-plan.${descriptor}.runExecutionsDescription`],
    signUpDescription: i10n[`pricing-plan.${descriptor}.signUpDescription`]
  });

  render() {
    const { i10n, model, classes } = this.props;
    const { product } = this.state;

    return (
      <Container main maxWidth="md">
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <PricingCard {...product} noSelection />
          </Grid>
          <Grid item xs={2} />
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Box mt={2}>
              <Grid container>
                <Grid item xs={3}>
                  {i10n['product-detail.average.rating']}
                </Grid>
                <Grid
                  container
                  item
                  xs={9}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <Typography variant="h5">{model.AverageRating}</Typography>
                  <Rating value={model.AverageRating} readOnly />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid>
          <Box mt={3} />
        </Grid>
        {model.Comments.map(item => (
          <Grid container className={classes.commentGrid}>
            <Grid item xs={3}>
              <Rating readOnly value={item.Rating} />
            </Grid>
            <Grid
              container
              item
              xs={9}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Typography className={classes.boldParagraph}>
                {item.CommentBy}
              </Typography>
              <Typography>{item.CreatedDate}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.commentParagraph}>
                {item.Comment}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Container>
    );
  }
}

export const ProductDetailTemplate = withStyles(styles)(
  withLocalization(ProductDetailTemplateComponent)
);
