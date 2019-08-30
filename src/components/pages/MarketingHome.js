import React from 'react';
import { Typography, GridList, GridListTile } from '@material-ui/core';
import { MarketingCard } from '../molecules';
import { PageLayout } from '../organisms';
import './MarketingHome.scss';

export const MarketingHome = () => (
  <PageLayout>
    <div className="marketing-home">
      <Typography variant="h2">Sample Supply Chain</Typography>
      <Typography variant="h4">
        Your one stop shop for sample supply management in your lab.
      </Typography>

      <GridList cols={2} className="marketing-home-grid-list">
        <GridListTile key="card1">
          <MarketingCard
            upperText="Preparado para su negocio"
            title="Gestión y Seguimiento de Muestras"
          >
            Sea capaz de gestionar y seguir todas las muestras de sus depósitos
            distribuídas en ubicaciones geográficas diferentes.
          </MarketingCard>
        </GridListTile>

        <GridListTile key="card2">
          <MarketingCard upperText="No gaste en auditorías" title="Compliance">
            Sea capaz de gestionar y seguir todas las muestras de sus depósitos
            distribuídas en ubicaciones geográficas diferentes.
          </MarketingCard>
        </GridListTile>
        <GridListTile key="card3">
          <MarketingCard
            upperText="Libertad para definir sus investigaciones"
            title="Customización de Ensayos Clínicos"
          >
            Con una plataforma capaz de configurarse para realizar los ensayos
            clínicos de cualquier forma que usted y su equipo necesite.
          </MarketingCard>
        </GridListTile>
        <GridListTile key="card4">
          <MarketingCard
            upperText="No pierda rastro de sus caros recursos"
            title="Inventariado"
          >
            Mantenga completo control de todas sus muestras automáticamente
            seleccionar el mejor conjunto de las mismas para sus ensayos.
          </MarketingCard>
        </GridListTile>
      </GridList>
    </div>
  </PageLayout>
);
