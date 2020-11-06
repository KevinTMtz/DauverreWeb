import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import PageTitle from '../components/PageTitle';
import Divisor from '../components/Divisor';

const styledReportDiv = css({
  textAlign: 'center',
  width: '85%',
  margin: '0px auto 50px auto',
});

const chartGeneralStyle = css({
  margin: '0px auto 45px auto',
  width: '70%',
  height: '350px',
  '@media (max-width: 700px)': {
    width: '95%',
    height: '300px',
  },
});

const pStyled = css({
  fontWeight: 'bold',
});

const StatisticsPage: React.FC = () => {
  const dataResidentes = [
    { name: 'FEB', residentes: 5 },
    { name: 'MAR', residentes: 5 },
    { name: 'ABR', residentes: 5 },
    { name: 'MAY', residentes: 6 },
    { name: 'JUN', residentes: 6 },
    { name: 'JUL', residentes: 6 },
  ];

  const dataReportes = [
    { name: 'FEB', reportes: 5 },
    { name: 'MAR', reportes: 25 },
    { name: 'ABR', reportes: 45 },
    { name: 'MAY', reportes: 69 },
    { name: 'JUN', reportes: 93 },
    { name: 'JUL', reportes: 117 },
  ];

  const dataPublicaciones = [
    { name: 'FEB', publicaciones: 5 },
    { name: 'MAR', publicaciones: 7 },
    { name: 'ABR', publicaciones: 10 },
    { name: 'MAY', publicaciones: 15 },
    { name: 'JUN', publicaciones: 13 },
    { name: 'JUL', publicaciones: 17 },
  ];

  return (
    <div>
      <PageTitle message={'Estadísticas'} />

      <Divisor />

      <div css={styledReportDiv}>
        <PageTitle message={'General'} />
        <p css={pStyled}>Total de residentes activos</p>
        <div css={chartGeneralStyle}>
          <ResponsiveContainer>
            <BarChart data={dataResidentes} css={chartGeneralStyle}>
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="residentes"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p css={pStyled}>Total de reportes de estado generados</p>
        <div css={chartGeneralStyle}>
          <ResponsiveContainer>
            <BarChart data={dataReportes} css={chartGeneralStyle}>
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="reportes"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p css={pStyled}>Total de publicaciones activas</p>
        <div css={chartGeneralStyle}>
          <ResponsiveContainer>
            <BarChart data={dataPublicaciones} css={chartGeneralStyle}>
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="publicaciones"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Divisor />

      <div css={styledReportDiv}>
        <PageTitle message={'Semanal'} />
        <h2>Publicaciones de la página</h2>
        <p css={pStyled}>Total de publicaciones añadidas esta semana</p>
        <p css={pStyled}>Total de publicaciones eliminadas esta semana</p>
        <p css={pStyled}>Total de publicaciones editadas esta semana</p>

        <h2>Residentes</h2>
        <p css={pStyled}>Total de residentes dados de alta esta semana</p>
        <p css={pStyled}>Total de residentes desactivados esta semana</p>
        <p css={pStyled}>Total de residentes dados de baja esta semana</p>

        <h2>Reportes de estado anímico</h2>
        <p css={pStyled}>
          Cantidad de reportes de estado anímico y de salud generados esta
          semana
        </p>
        <p css={pStyled}>
          Cantidad de residentes a los que no se les generó reporte de estado
          anímico y de salud esta semana
        </p>

        <h3>Respecto al estado anímico de los residentes</h3>
        <p css={pStyled}>
          Cantidad de residentes que estuvieron muy felices esta semana
        </p>
        <p css={pStyled}>
          Cantidad de residentes que estuvieron felices esta semana
        </p>
        <p css={pStyled}>
          Cantidad de residentes que tuvieron un estado de ánimo neutro esta
          semana
        </p>
        <p css={pStyled}>
          Cantidad de residentes que estuvieron tristes esta semana
        </p>
        <p css={pStyled}>
          Cantidad de residentes que estuvieron muy tristes esta semana
        </p>

        <h3>Respecto al estado de salud de los residentes</h3>
        <p css={pStyled}>
          Cantidad de residentes con un estado de salud excelente esta semana
        </p>
        <p css={pStyled}>
          Cantidad de residentes con un estado de salud bueno esta semana
        </p>
        <p css={pStyled}>
          Cantidad de residentes con un estado de salud medio esta semana
        </p>
        <p css={pStyled}>
          Cantidad de residentes con un estado de salud malo esta semana
        </p>
        <p css={pStyled}>
          Cantidad de residentes con un estado de salud muy malo esta semana
        </p>

        <h3>Respecto a las situaciones especiales de los reportes</h3>
        <p css={pStyled}>
          Cantidad de residentes que estuvieron deprimidas en la semana
        </p>
        <p css={pStyled}>
          Cantidad de residentes que estuvieron enojados en la semana
        </p>
        <p css={pStyled}>
          Cantidad de residentes que durmieron bien en la semana
        </p>
        <p css={pStyled}>
          Cantidad de residentes que se alimentaron bien en la semana
        </p>
        <p css={pStyled}>
          Cantidad de residentes que se sintieron solos en la semana
        </p>
      </div>
    </div>
  );
};

export default StatisticsPage;
