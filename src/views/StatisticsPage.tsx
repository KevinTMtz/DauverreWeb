import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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
import OperationEmoji from '../components/statistics-components/OperationEmoji';

import SleepyIcon from '../assets/emojis/sleepy.svg';
import AngryIcon from '../assets/emojis/angry.svg';
import CryingIcon from '../assets/emojis/crying.svg';
import FoodIcon from '../assets/emojis/food.svg';
import AloneIcon from '../assets/emojis/alone.svg';

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
  marginBottom: '5px',
});

interface CustomaAxisTickProps {
  x: number;
  y: number;
  payload: any;
}

interface CustomBarLabelProps {
  x: number;
  y: number;
  width: number;
  value: any;
}

interface IconAndNumberProps {
  value: number;
  total: number;
  imagePath: string;
}

const RenderCustomAxisTickHealth: React.FC<CustomaAxisTickProps> = ({
  x,
  y,
  payload,
}) => {
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

const RenderCustomAxisTickMood: React.FC<CustomaAxisTickProps> = ({
  x,
  y,
  payload,
}) => {
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

const RenderCustomAxisTickPostsOrResidents: React.FC<CustomaAxisTickProps> = ({
  x,
  y,
  payload,
}) => {
  let path = 1;
  switch (payload.value) {
    case 'Altas':
      path = 1;
      break;
    case 'Actualizaciones':
    case 'Desactivaciones':
      path = 2;
      break;
    case 'Bajas':
      path = 3;
      break;
  }

  return (
    <OperationEmoji
      index={path as OneToThreeIdx}
      x={x - 15}
      y={y + 5}
      width={30}
      height={30}
    />
  );
};

const RenderCustomBarLabel: React.FC<CustomBarLabelProps> = ({
  x,
  y,
  width,
  value,
}) => {
  return (
    <text x={x + width / 2} y={y} fill="#000" textAnchor="middle" dy={-6}>
      {value}
    </text>
  );
};

const IconAndNumber: React.FC<IconAndNumberProps> = ({
  value,
  total,
  imagePath,
}) => {
  const styledDiv = css({
    display: 'flex',
    justifyContent: 'center',
    color: '#8884d8',
  });

  return (
    <div css={styledDiv}>
      <img
        src={imagePath}
        alt={`From: ${imagePath}`}
        style={{ width: '50px', height: 'auto', marginRight: '32px' }}
      />
      <p
        style={{ fontSize: '25px', fontWeight: 'bold' }}
      >{`${value} de ${total}`}</p>
    </div>
  );
};

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
    { name: 'Saludable', residentes: 4 },
    { name: 'Poco enfermo', residentes: 3 },
    { name: 'Enfermo', residentes: 3 },
    { name: 'Muy enfermo', residentes: 2 },
    { name: 'Peligro', residentes: 1 },
  ];

  const dataPostsAdministration = [
    { name: 'Altas', total: 4 },
    { name: 'Actualizaciones', total: 6 },
    { name: 'Bajas', total: 2 },
  ];

  const dataResidentsAdministration = [
    { name: 'Altas', total: 3 },
    { name: 'Desactivaciones', total: 2 },
    { name: 'Bajas', total: 1 },
  ];

  const dataCountReportsGenerated = [
    { name: 'Generados', value: 10 },
    { name: 'No generados', value: 6 },
  ];
  const colorsCountReportsGenerated = ['#77B255', '#EA596E'];

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
                label={RenderCustomBarLabel}
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
                label={RenderCustomBarLabel}
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
                label={RenderCustomBarLabel}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Divisor />

      <div css={styledReportDiv}>
        <PageTitle message={'Semanales'} />
        <h2>Publicaciones de la página</h2>
        <p css={pStyled}>Altas, actualizaciones y bajas</p>
        <div css={chartGeneralStyle}>
          <ResponsiveContainer>
            <BarChart
              data={dataPostsAdministration}
              margin={{
                top: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis
                dataKey="name"
                tick={RenderCustomAxisTickPostsOrResidents}
              />
              <YAxis dataKey="total" />
              <Tooltip />
              <Bar
                dataKey="total"
                fill="#8884d8"
                label={RenderCustomBarLabel}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h2>Residentes</h2>
        <p css={pStyled}>Altas, desactivaciones y bajas</p>
        <div css={chartGeneralStyle}>
          <ResponsiveContainer>
            <BarChart
              data={dataResidentsAdministration}
              margin={{
                top: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="10 10" />
              <XAxis
                dataKey="name"
                tick={RenderCustomAxisTickPostsOrResidents}
              />
              <YAxis dataKey="total" />
              <Tooltip />
              <Bar
                dataKey="total"
                fill="#8884d8"
                label={RenderCustomBarLabel}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h2>Reportes de estado anímico</h2>
        <p css={pStyled}>
          Cantidad de residentes a los que se les generó reporte de estado y a
          los que no
        </p>
        <div css={chartGeneralStyle}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                isAnimationActive={true}
                data={dataCountReportsGenerated}
                dataKey="value"
                fill="#8884d8"
                label
              >
                {colorsCountReportsGenerated.map((entry, index) => (
                  <Cell
                    fill={
                      colorsCountReportsGenerated[
                        index % dataCountReportsGenerated.length
                      ]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
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
              <XAxis dataKey="name" tick={RenderCustomAxisTickMood} />
              <YAxis dataKey="residentes" />
              <Tooltip />
              <Bar
                dataKey="residentes"
                fill="#8884d8"
                label={RenderCustomBarLabel}
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
              <XAxis dataKey="name" tick={RenderCustomAxisTickHealth} />
              <YAxis dataKey="residentes" />
              <Tooltip />
              <Bar
                dataKey="residentes"
                fill="#8884d8"
                label={RenderCustomBarLabel}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <h3>Respecto a las situaciones especiales de los reportes</h3>
        <p css={pStyled}>
          Cantidad de residentes que estuvieron deprimidos en la semana
        </p>
        <IconAndNumber imagePath={CryingIcon} value={5} total={20} />
        <p css={pStyled}>
          Cantidad de residentes que estuvieron enojados en la semana
        </p>
        <IconAndNumber imagePath={AngryIcon} value={5} total={20} />
        <p css={pStyled}>
          Cantidad de residentes que durmieron bien en la semana
        </p>
        <IconAndNumber imagePath={SleepyIcon} value={5} total={20} />
        <p css={pStyled}>
          Cantidad de residentes que se alimentaron bien en la semana
        </p>
        <IconAndNumber imagePath={FoodIcon} value={5} total={20} />
        <p css={pStyled}>
          Cantidad de residentes que se sintieron solos en la semana
        </p>
        <IconAndNumber imagePath={AloneIcon} value={5} total={20} />
      </div>
    </div>
  );
};

export default StatisticsPage;
