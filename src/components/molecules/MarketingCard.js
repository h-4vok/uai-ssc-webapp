import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import { RouteLink } from '../atoms/RouteLink';

export const MarketingCard = props => (
  <Card>
    <CardContent>
      <Typography>{props.upperText}</Typography>
      <Typography variant="h5">{props.title}</Typography>
      <Typography color="textSecondary">{props.children}</Typography>
    </CardContent>
    <CardActions>
      <Button size="small">
        <RouteLink dark to="signup">
          ¡Empiece Ahora!
        </RouteLink>
      </Button>
    </CardActions>
  </Card>
);
