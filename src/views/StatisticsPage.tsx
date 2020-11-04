import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import PageTitle from '../components/PageTitle';
import Divisor from '../components/Divisor';

const styledReportDiv = css({
  width: '85%',
  margin: '0px auto 50px auto',
});

const StatisticsPage: React.FC = () => (
  <div>
    <PageTitle message={'Estadísticas'} />

    <Divisor />

    <div css={styledReportDiv}>
      <PageTitle message={'General'} />
      <p>Total de residentes activos</p>
      <p>Total de reportes de estado generados</p>
      <p>Total de publicaciones activas</p>
    </div>

    <Divisor />

    <div css={styledReportDiv}>
      <PageTitle message={'Semanal'} />
      <h2>Publicaciones de la página</h2>
      <p>Total de publicaciones añadidas esta semana</p>
      <p>Total de publicaciones eliminadas esta semana</p>
      <p>Total de publicaciones editadas esta semana</p>

      <h2>Residentes</h2>
      <p>Total de residentes dados de alta esta semana</p>
      <p>Total de residentes desactivados esta semana</p>
      <p>Total de residentes dados de baja esta semana</p>

      <h2>Reportes de estado anímico</h2>
      <p>
        Cantidad de reportes de estado anímico y de salud generados esta semana
      </p>
      <p>
        Cantidad de residentes a los que no se les generó reporte de estado
        anímico y de salud esta semana
      </p>

      <h3>Respecto al estado anímico de los residentes</h3>
      <p>Cantidad de residentes que estuvieron muy felices esta semana</p>
      <p>Cantidad de residentes que estuvieron felices esta semana</p>
      <p>
        Cantidad de residentes que tuvieron un estado de ánimo neutro esta
        semana
      </p>
      <p>Cantidad de residentes que estuvieron tristes esta semana</p>
      <p>Cantidad de residentes que estuvieron muy tristes esta semana</p>

      <h3>Respecto al estado de salud de los residentes</h3>
      <p>Cantidad de residentes con un estado de salud excelente esta semana</p>
      <p>Cantidad de residentes con un estado de salud bueno esta semana</p>
      <p>Cantidad de residentes con un estado de salud medio esta semana</p>
      <p>Cantidad de residentes con un estado de salud malo esta semana</p>
      <p>Cantidad de residentes con un estado de salud muy malo esta semana</p>

      <h3>Respecto a las situaciones especiales de los reportes</h3>
      <p>Cantidad de residentes que estuvieron deprimidas en la semana</p>
      <p>Cantidad de residentes que estuvieron enojados en la semana</p>
      <p>Cantidad de residentes que durmieron bien en la semana</p>
      <p>Cantidad de residentes que se alimentaron bien en la semana</p>
      <p>Cantidad de residentes que se sintieron solos en la semana</p>
    </div>
  </div>
);

export default StatisticsPage;
