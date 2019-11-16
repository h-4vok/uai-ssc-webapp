import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import { fromI10n } from '../../lib/GlobalState';
import './PriceSelectionCard.scss';

export const PriceSelectionCard = props => (
  <Card className="price-selection-card">
    <CardContent
      className="price-selection-card-content"
      style={{ textAlign: 'center' }}
    >
      <Typography variant="h3">{props.title}</Typography>
      <Typography variant="h4">{props.priceFormatted}</Typography>
    </CardContent>
    <CardActions>
      <Button
        variant={props.selected ? 'contained' : 'outlined'}
        fullWidth
        color="secondary"
        onClick={props.onClick}
      >
        {props.selected
          ? fromI10n('global.selected')
          : fromI10n('global.select')}
      </Button>
    </CardActions>
  </Card>
);
