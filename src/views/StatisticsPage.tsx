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
import RenderCustomAxisTickMood from '../components/statistics-components/RenderCustomAxisTickMood';
import RenderCustomAxisTickHealth from '../components/statistics-components/RenderCustomAxisTickHealth';
import RenderCustomAxisTickPostsOrResidents from '../components/statistics-components/RenderCustomAxisTickPostsOrResidents';
import RenderCustomBarLabel from '../components/statistics-components/RenderCustomBarLabel';
import IconAndData from '../components/statistics-components/IconAndData';

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

  const dataCountSpecialCases = {
    total: 20,
    countByCase: [5, 4, 11, 19, 2],
  };

  const forRenderingGeneralCharts = [
    {
      message: 'Total de residentes activos',
      data: dataResidentes,
      dataKeyX: 'name',
      dataKeyBar: 'residentes',
    },
    {
      message: 'Total de reportes de estado generados',
      data: dataReportes,
      dataKeyX: 'name',
      dataKeyBar: 'reportes',
    },
    {
      message: 'Total de publicaciones activas',
      data: dataPublicaciones,
      dataKeyX: 'name',
      dataKeyBar: 'publicaciones',
    },
  ];

  const forRenderingPostAndResidentsCharts = [
    {
      message1: 'Publicaciones de la página',
      message2: 'Altas, actualizaciones y bajas',
      data: dataPostsAdministration,
      dataKeyX: 'name',
      dataKeyY: 'total',
    },
    {
      message1: 'Residentes',
      message2: 'Altas, desactivaciones y bajas',
      data: dataResidentsAdministration,
      dataKeyX: 'name',
      dataKeyY: 'total',
    },
  ];

  const forRenderingHealthAndMood = [
    {
      message1: 'Estado anímico de los residentes',
      message2: 'Residentes por estado de ánimo',
      data: dataMood,
      dataKeyX: 'name',
      dataKeyY: 'residentes',
      customLabel: RenderCustomAxisTickMood,
    },
    {
      message1: 'Estado de salud de los residentes',
      message2: 'Residentes por estado de salud',
      data: dataHealth,
      dataKeyX: 'name',
      dataKeyY: 'residentes',
      customLabel: RenderCustomAxisTickHealth,
    },
  ];

  const forRenderingStates = [
    {
      message: 'Residentes que estuvieron deprimidos en la semana',
      state: 'crying',
    },
    {
      message: 'Residentes que estuvieron enojados en la semana',
      state: 'angry',
    },
    {
      message: 'Residentes que durmieron bien en la semana',
      state: 'sleepy',
    },
    {
      message: 'Residentes que se alimentaron bien en la semana',
      state: 'food',
    },
    {
      message: 'Residentes que se sintieron solos en la semana',
      state: 'alone',
    },
  ];

  return (
    <div>
      <PageTitle message={'Estadísticas'} />

      <Divisor />

      <PageTitle message={'Generales'} />
      <div css={styledReportDiv}>
        {forRenderingGeneralCharts.map(
          ({ message, data, dataKeyX, dataKeyBar }) => (
            <div>
              <p css={pStyled}>{message}</p>
              <div css={chartGeneralStyle}>
                <ResponsiveContainer>
                  <BarChart
                    data={data}
                    margin={{
                      top: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="10 10" />
                    <XAxis dataKey={dataKeyX} />
                    <YAxis yAxisId="left" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey={dataKeyBar}
                      stroke="#8884d8"
                      fill="#8884d8"
                      label={RenderCustomBarLabel}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ),
        )}
      </div>

      <Divisor />

      <div css={styledReportDiv}>
        <PageTitle message={'Semanales'} />

        {forRenderingPostAndResidentsCharts.map(
          ({ message1, message2, data, dataKeyX, dataKeyY }) => (
            <div>
              <h2>{message1}</h2>
              <p css={pStyled}>{message2}</p>
              <div css={chartGeneralStyle}>
                <ResponsiveContainer>
                  <BarChart
                    data={data}
                    margin={{
                      top: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="10 10" />
                    <XAxis
                      dataKey={dataKeyX}
                      tick={RenderCustomAxisTickPostsOrResidents}
                    />
                    <YAxis dataKey={dataKeyY} />
                    <Tooltip />
                    <Bar
                      dataKey={dataKeyY}
                      fill="#8884d8"
                      label={RenderCustomBarLabel}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ),
        )}

        <h2>Reportes de estado anímico</h2>
        <p css={pStyled}>
          Residentes a los que se les generó reporte de estado y a los que no
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
                    key={entry}
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

        {forRenderingHealthAndMood.map(
          ({ message1, message2, data, dataKeyX, dataKeyY, customLabel }) => (
            <div>
              <h2>{message1}</h2>
              <p css={pStyled}>{message2}</p>
              <div css={chartGeneralStyle}>
                <ResponsiveContainer>
                  <BarChart
                    data={data}
                    margin={{
                      top: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="10 10" />
                    <XAxis dataKey={dataKeyX} tick={customLabel} />
                    <YAxis dataKey={dataKeyY} />
                    <Tooltip />
                    <Bar
                      dataKey={dataKeyY}
                      fill="#8884d8"
                      label={RenderCustomBarLabel}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ),
        )}

        <h3>Respecto a las situaciones especiales de los reportes</h3>
        {forRenderingStates.map(({ message, state }, index) => (
          <div>
            <p css={pStyled}>{message}</p>
            <IconAndData
              state={state}
              value={dataCountSpecialCases.countByCase[index]}
              total={dataCountSpecialCases.total}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsPage;
