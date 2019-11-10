import React from 'react';
import {
  Typography,
  GridList,
  GridListTile,
  Container
} from '@material-ui/core';
import { MarketingCard } from '../molecules';
import { PageLayout, RandomSurveyPresenter } from '../organisms';
import withLocalization from '../../localization/withLocalization';
import './MarketingHome.scss';

const MarketingHomeComponent = ({ i10n, history }) => (
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

      <div style={{ visibility: 'hidden', display: 'none' }}>
        {process.env.REACT_APP_API_PREFIX}
      </div>
    </div>

    <Container maxWidth="md">
      <RandomSurveyPresenter
        onSubmission={id => history.push(`/survey-results/${id}`)}
      />
    </Container>
  </PageLayout>
);

export const MarketingHome = withLocalization(MarketingHomeComponent);
