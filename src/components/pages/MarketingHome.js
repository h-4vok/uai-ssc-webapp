import React from 'react';
import { Typography, GridList, GridListTile } from '@material-ui/core';
import { MarketingCard } from '../molecules';
import { PageLayout, PricingChart } from '../organisms';
import withLocalization from '../../localization/withLocalization';
import './MarketingHome.scss';

const MarketingHomeComponent = ({ i10n }) => (
  <PageLayout>
    <div className="marketing-home">
      <Typography variant="h2">{i10n['app.title']}</Typography>
      <Typography variant="h4">{i10n['app.home.slogan']}</Typography>

      <GridList cols={2} className="marketing-home-grid-list">
        <GridListTile key="card1">
          <MarketingCard
            upperText={i10n['home.card.tracking.header']}
            title={i10n['home.card.tracking.title']}
          >
            {i10n['home.card.tracking.subtitle']}
          </MarketingCard>
        </GridListTile>

        <GridListTile key="card2">
          <MarketingCard
            upperText={i10n['home.card.compliance.header']}
            title={i10n['home.card.compliance.title']}
          >
            {i10n['home.card.compliance.subtitle']}
          </MarketingCard>
        </GridListTile>
        <GridListTile key="card3">
          <MarketingCard
            upperText={i10n['home.card.custom-runs.header']}
            title={i10n['home.card.custom-runs.title']}
          >
            {i10n['home.card.custom-runs.subtitle']}
          </MarketingCard>
        </GridListTile>
        <GridListTile key="card4">
          <MarketingCard
            upperText={i10n['home.card.inventory.header']}
            title={i10n['home.card.inventory.title']}
          >
            {i10n['home.card.inventory.subtitle']}
          </MarketingCard>
        </GridListTile>
      </GridList>

      <PricingChart className="pricing-chart" />
      <div style={{ visibility: 'hidden', display: 'none' }}>
        {process.env.REACT_APP_API_PREFIX}
      </div>
    </div>
  </PageLayout>
);

export const MarketingHome = withLocalization(MarketingHomeComponent);
