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
import HealthEmoji from '../components/report-components/HealthEmoji';
import MoodEmoji from '../components/report-components/MoodEmoji';

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
    width: '100%',
    height: '300px',
  },
});

const pStyled = css({
  fontWeight: 'bold',
});

const renderCustomAxisTickHealth: React.FC<any> = ({ x, y, payload }) => {
  let path = 1;
  switch (payload.value) {
    case 'Saludable':
      path = 1;
      break;
    case 'Poco enfermo':
      path = 2;
      break;
    case 'Enfermo':
      path = 3;
      break;
    case 'Muy enfermo':
      path = 4;
      break;
    case 'Peligro':
      path = 5;
      break;
  }

  return (
    <HealthEmoji
      index={path as OneToFiveIdx}
      x={x - 15}
      y={y + 5}
      width={30}
      height={30}
    />
  );
};

const renderCustomAxisTickMood: React.FC<any> = ({ x, y, payload }) => {
  let path = 1;
  switch (payload.value) {
    case 'Muy felíz':
      path = 1;
      break;
    case 'Felíz':
      path = 2;
      break;
    case 'Neutro':
      path = 3;
      break;
    case 'Triste':
      path = 4;
      break;
    case 'Muy triste':
      path = 5;
      break;
  }

  return (
    <MoodEmoji
      index={path as OneToFiveIdx}
      x={x - 15}
      y={y + 5}
      width={30}
      height={30}
    />
  );
};

const renderCustomBarLabel: React.FC<any> = ({ x, y, width, value }) => {
  return (
    <text x={x + width / 2} y={y} fill="#000" textAnchor="middle" dy={-6}>
      {value}
    </text>
  );
};

// ENE / FEB/ MAR / ABR / MAY / JUN / JUL / AGO / SET (o SEP) / OCT / NOV / DIC

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
    { name: 'FEB', publicaciones: 8 },
    { name: 'MAR', publicaciones: 7 },
    { name: 'ABR', publicaciones: 10 },
    { name: 'MAY', publicaciones: 15 },
    { name: 'JUN', publicaciones: 13 },
    { name: 'JUL', publicaciones: 17 },
  ];

  const dataMood = [
    { name: 'Muy felíz', residentes: 4 },
    { name: 'Felíz', residentes: 3 },
    { name: 'Neutro', residentes: 2 },
    { name: 'Triste', residentes: 3 },
    { name: 'Muy triste', residentes: 1 },
  ];

  const dataHealth = [
    { name: 'Saludable', residentes: 3 },
    { name: 'Poco enfermo', residentes: 1 },
    { name: 'Enfermo', residentes: 4 },
    { name: 'Muy enfermo', residentes: 4 },
    { name: 'Peligro', residentes: 2 },
  ];

  return (
    <div>
      <PageTitle message={'Estadísticas'} />

      <Divisor />

      <div css={styledReportDiv}>
        <PageTitle message={'Generales'} />
        <p css={pStyled}>Total de residentes activos</p>
        <div css={chartGeneralStyle}>
          <ResponsiveContainer>
            <BarChart
              data={dataResidentes}
              margin={{
                top: 20,
              }}
            >
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
                label={renderCustomBarLabel}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p css={pStyled}>Total de reportes de estado generados</p>
        <div css={chartGeneralStyle}>
          <ResponsiveContainer>
            <BarChart
              data={dataReportes}
              margin={{
                top: 20,
              }}
            >
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
                label={renderCustomBarLabel}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p css={pStyled}>Total de publicaciones activas</p>
        <div css={chartGeneralStyle}>
          <ResponsiveContainer>
            <BarChart data={dataPublicaciones}>
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
                label={renderCustomBarLabel}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Divisor />

      <div css={styledReportDiv}>
        <PageTitle message={'Semanales'} />
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
        <p css={pStyled}>Residentes por estado de ánimo</p>
        <div css={chartGeneralStyle}>
          <ResponsiveContainer>
            <BarChart
              data={dataMood}
              margin={{
                top: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis dataKey="name" tick={renderCustomAxisTickMood} />
              <YAxis dataKey="residentes" />
              <Tooltip />
              <Bar
                dataKey="residentes"
                fill="#8884d8"
                label={renderCustomBarLabel}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h3>Respecto al estado de salud de los residentes</h3>
        <p css={pStyled}>Residentes por estado de salud</p>
        <div css={chartGeneralStyle}>
          <ResponsiveContainer>
            <BarChart
              data={dataHealth}
              margin={{
                top: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis dataKey="name" tick={renderCustomAxisTickHealth} />
              <YAxis dataKey="residentes" />
              <Tooltip />
              <Bar
                dataKey="residentes"
                fill="#8884d8"
                label={renderCustomBarLabel}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

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
