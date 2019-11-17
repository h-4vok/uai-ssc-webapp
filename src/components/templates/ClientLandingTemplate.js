import React, { PureComponent } from 'react';
import { Container, Box, Typography, Grid, Button } from '@material-ui/core';
import { AccountTransactions } from '../organisms';
import withLocalization from '../../localization/withLocalization';
import './ClientLandingTemplate.scss';

class ClientLandingTemplateComponent extends PureComponent {
  render() {
    const {
      model,
      i10n,
      onManage,
      onBuy,
      onRefresh,
      onViewReceipt
    } = this.props;

    return (
      <Container maxWidth="lg">
        <Box m={2} className="your-plan-box">
          <Typography variant="h5">
            {i10n['client-landing.your-plan']}
          </Typography>
          <Grid direction="row" justify="center">
            <Grid item>
              <Typography variant="h1">{model.ServicePlanName}</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={onManage}>
                {i10n['client-landing.action.manage']}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box m={2} className="plan-valid-until-box">
          <Typography variant="h5">
            {i10n['client-landing.expiration-date']}
          </Typography>
          <Typography variant="h4">
            {model.ServiceExpirationDescription}
          </Typography>
          <Button variant="contained" color="primary" onClick={onBuy}>
            {i10n['client-landing.action.buy']}
          </Button>
        </Box>
        {model.Transactions && (
          <Box m={2} className="your-plan-box">
            <Typography variant="h3">
              {i10n['client-landing.account-status']}
            </Typography>
            <AccountTransactions
              onViewReceipt={onViewReceipt}
              onRefresh={onRefresh}
              items={model.Transactions}
            />
          </Box>
        )}
      </Container>
    );
  }
}

export const ClientLandingTemplate = withLocalization(
  ClientLandingTemplateComponent
);
