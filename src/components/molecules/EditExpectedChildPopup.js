/* eslint-disable react/jsx-no-duplicate-props */
import React, { PureComponent } from 'react';
import { Container, Grid, Typography, InputAdornment } from '@material-ui/core';
import { SimpleTextField } from '../atoms';
import { handleNumericChange, handleDecimalChange } from '../../operators';
import withLocalization from '../../localization/withLocalization';

class EditExpectedChildPopupComponent extends PureComponent {
  constructor(props) {
    super(props);

    const {
      ExpectedChildQuantity,
      DilutionFactor,
      ResultingVolume
    } = this.props.model;

    this.state = {
      ExpectedChildQuantity,
      DilutionFactor,
      ResultingVolume
    };
  }

  onInputChange = (name, value) => {
    this.props.model[name] = value;
    this.setState({ [name]: value });
  };

  render() {
    const { i10n } = this.props;
    const { ParentBarcode, UnitOfMeasureCode } = this.props.model;
    const {
      ExpectedChildQuantity,
      DilutionFactor,
      ResultingVolume
    } = this.state;

    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">
              {`${
                i10n['expected-child-sample.grid.parent-barcode']
              }: ${ParentBarcode}`}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <SimpleTextField
              fullWidth
              required
              maxLength="1"
              label={i10n['expected-child-sample.grid.ExpectedChildQuantity']}
              onChange={handleNumericChange(value =>
                this.onInputChange('ExpectedChildQuantity', value)
              )}
              value={ExpectedChildQuantity}
              inputProps={{ style: { textAlign: 'center' } }}
            />
          </Grid>
          <Grid item xs={4}>
            <SimpleTextField
              fullWidth
              required
              maxLength="4"
              label={i10n['expected-child-sample.grid.DilutionFactor']}
              onChange={handleDecimalChange(value =>
                this.onInputChange('DilutionFactor', value)
              )}
              value={DilutionFactor}
              inputProps={{ style: { textAlign: 'center' } }}
            />
          </Grid>
          <Grid item xs={3}>
            <SimpleTextField
              fullWidth
              required
              maxLength="8"
              label={i10n['expected-child-sample.grid.ResultingVolume']}
              onChange={handleDecimalChange(value =>
                this.onInputChange('ResultingVolume', value)
              )}
              value={ResultingVolume}
              inputProps={{ style: { textAlign: 'center' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{`(${UnitOfMeasureCode})`}</InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export const EditExpectedChildPopup = withLocalization(
  EditExpectedChildPopupComponent
);
