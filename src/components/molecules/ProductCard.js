import React, { PureComponent } from 'react';
import fillTemplate from 'es6-dynamic-template';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@material-ui/core';
import './PricingCard.styles.scss';
import withLocalization from '../../localization/withLocalization';

class ProductCardComponent extends PureComponent {
  setDescription = (value, withLimitTemplate, noLimitText) =>
    value
      ? fillTemplate(this.props.i10n[withLimitTemplate], { value })
      : this.props.i10n[noLimitText];

  render() {
    const {
      i10n,
      Name,
      Price,
      PatientSampleLimit,
      ControlSampleLimit,
      ClinicRehearsalLimit,
      UserLimit,
      onRemoveSelection,
      onSelection,
      isSelected
    } = this.props;

    return (
      <Card>
        <CardHeader
          title={Name}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
          className="pricing-header"
        />
        <CardContent className="pricing-content">
          <div align="center">
            <Typography component="h2" variant="h3" color="textPrimary">
              {`USD ${Price}`}
            </Typography>
          </div>
          <ul>
            <Typography
              component="li"
              variant="subtitle1"
              align="center"
              key="2"
            >
              {this.setDescription(
                PatientSampleLimit,
                'product-card.patient-sample-limit',
                'product-card.patient-sample-unlimited'
              )}
            </Typography>
            <Typography
              component="li"
              variant="subtitle1"
              align="center"
              key="3"
            >
              {this.setDescription(
                ControlSampleLimit,
                'product-card.control-sample-limit',
                'product-card.control-sample-unlimited'
              )}
            </Typography>
            <Typography
              component="li"
              variant="subtitle1"
              align="center"
              key="4"
            >
              {this.setDescription(
                ClinicRehearsalLimit,
                'product-card.run-limit',
                'product-card.run-unlimited'
              )}
            </Typography>
            <Typography
              component="li"
              variant="subtitle1"
              align="center"
              key="5"
            >
              {this.setDescription(
                UserLimit,
                'product-card.user-limit',
                'product-card.no-user-limit'
              )}
            </Typography>
          </ul>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant={isSelected ? 'outlined' : 'contained'}
            color="primary"
            onClick={() =>
              isSelected
                ? onRemoveSelection({ ...this.props })
                : onSelection({ ...this.props })
            }
          >
            {isSelected
              ? i10n['global.remove-compare']
              : i10n['global.compare']}
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export const ProductCard = withLocalization(ProductCardComponent);
