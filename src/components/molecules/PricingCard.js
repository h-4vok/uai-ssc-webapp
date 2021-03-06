import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@material-ui/core';
import './PricingCard.styles.scss';

export const PricingCard = props => (
  <Card>
    <CardHeader
      title={props.title}
      subheader={props.subheader}
      titleTypographyProps={{ align: 'center' }}
      subheaderTypographyProps={{ align: 'center' }}
      className="pricing-header"
    />
    <CardContent className="pricing-content">
      <div align="center">
        <Typography component="h2" variant="h3" color="textPrimary">
          {props.price}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {props.billFrequency}
        </Typography>
      </div>
      <ul>
        <Typography component="li" variant="subtitle1" align="center" key="1">
          {props.planDescription}
        </Typography>
        <Typography component="li" variant="subtitle1" align="center" key="2">
          {props.patientSamplesDescription}
        </Typography>
        <Typography component="li" variant="subtitle1" align="center" key="3">
          {props.controlSamplesDescription}
        </Typography>
        <Typography component="li" variant="subtitle1" align="center" key="4">
          {props.userAccountsDescription}
        </Typography>
        <Typography component="li" variant="subtitle1" align="center" key="5">
          {props.runExecutionsDescription}
        </Typography>
      </ul>
    </CardContent>
    <CardActions>
      {!props.noSelection && (
        <Button
          fullWidth
          variant={props.buttonVariant || 'outlined'}
          color="primary"
          onClick={() => props.onSelection()}
        >
          {props.signUpDescription}
        </Button>
      )}
    </CardActions>
  </Card>
);
