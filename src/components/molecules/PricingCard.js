import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@material-ui/core';

export const PricingCard = props => (
  <Card>
    <CardHeader
      title={props.title}
      subheader={props.subheader}
      titleTypographyProps={{ align: 'center' }}
      subheaderTypographyProps={{ align: 'center' }}
      className="pricing-header"
    />
    <CardContent>
      <div className="pricing-content" align="center">
        <Typography component="h2" variant="h3" color="textPrimary">
          {props.price}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {props.billFrequency}
        </Typography>
      </div>
      <ul>
        <Typography component="li" variant="subtitle1" align="center" key="1">
          {props.patientSamplesDescription}
        </Typography>
        <Typography component="li" variant="subtitle1" align="center" key="1">
          {props.controlSamplesDescription}
        </Typography>
        <Typography component="li" variant="subtitle1" align="center" key="1">
          {props.userAccountsDescription}
        </Typography>
        <Typography component="li" variant="subtitle1" align="center" key="1">
          {props.runExecutionsDescription}
        </Typography>
      </ul>
    </CardContent>
    <CardActions>
      <Button fullWidth variant="outlined" color="primary">
        {props.signUpDescription}
      </Button>
    </CardActions>
  </Card>
);