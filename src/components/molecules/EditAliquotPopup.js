/* eslint-disable react/jsx-no-duplicate-props */
import React, { PureComponent } from 'react';
import { Container, Grid, Typography, InputAdornment } from '@material-ui/core';
import { SimpleTextField } from '../atoms';
import { handleDecimalChange } from '../../operators';
import withLocalization from '../../localization/withLocalization';

class EditAliquotPopupComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { UsedParentVolume, FinalChildVolume } = this.props.model;

    this.state = {
      UsedParentVolume,
      FinalChildVolume
    };
  }

  onInputChange = (name, value) => {
    this.props.model[name] = value;
    this.setState({ [name]: value });
  };

  render() {
    const { i10n } = this.props;
    const {
      ParentBarcode,
      ChildBarcode,
      DilutionFactor,
      VolumeToUse,
      ResultingVolume,
      UnitOfMeasureCode
    } = this.props.model;
    const { UsedParentVolume, FinalChildVolume } = this.state;

    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">
              {`${ParentBarcode} - ${ChildBarcode}`}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <SimpleTextField
              fullWidth
              label={i10n['execute-work-order.grid.DilutionFactor']}
              value={DilutionFactor}
              readOnly
              disabled
              inputProps={{ style: { textAlign: 'center' } }}
            />
          </Grid>
          <Grid item xs={4}>
            <SimpleTextField
              fullWidth
              label={i10n['execute-work-order.grid.VolumeToUse']}
              value={VolumeToUse}
              readOnly
              disabled
              inputProps={{ style: { textAlign: 'center' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{`(${UnitOfMeasureCode})`}</InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <SimpleTextField
              fullWidth
              label={i10n['execute-work-order.grid.ResultingVolume']}
              value={ResultingVolume}
              readOnly
              disabled
              inputProps={{ style: { textAlign: 'center' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{`(${UnitOfMeasureCode})`}</InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <SimpleTextField
              fullWidth
              required
              maxLength="8"
              label={i10n['execute-work-order.grid.UsedParentVolume']}
              onChange={handleDecimalChange(value =>
                this.onInputChange('UsedParentVolume', value)
              )}
              value={UsedParentVolume}
              inputProps={{ style: { textAlign: 'center' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{`(${UnitOfMeasureCode})`}</InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <SimpleTextField
              fullWidth
              required
              maxLength="8"
              label={i10n['execute-work-order.grid.FinalChildVolume']}
              onChange={handleDecimalChange(value =>
                this.onInputChange('FinalChildVolume', value)
              )}
              value={FinalChildVolume}
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

export const EditAliquotPopup = withLocalization(EditAliquotPopupComponent);
