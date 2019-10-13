import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import { RouteLink } from '../atoms/RouteLink';
import withLocalization from '../../localization/withLocalization';

const MarketingCardComponent = props => (
  <Card>
    <CardContent>
      <Typography>{props.upperText}</Typography>
      <Typography variant="h5">{props.title}</Typography>
      <Typography color="textSecondary">{props.children}</Typography>
    </CardContent>
    <CardActions>
      <Button size="small">
        <RouteLink dark to="signup--initial">
          {props.i10n['home.card.all.start-now']}
        </RouteLink>
      </Button>
    </CardActions>
  </Card>
);

export const MarketingCard = withLocalization(MarketingCardComponent);
