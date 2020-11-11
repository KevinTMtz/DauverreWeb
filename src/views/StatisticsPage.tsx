import React, { useEffect, useState } from 'react';
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
  ResponsiveContainer,
} from 'recharts';

import PageTitle from '../components/PageTitle';
import Divisor from '../components/Divisor';
import RenderCustomAxisTickMood from '../components/statistics-components/RenderCustomAxisTickMood';
import RenderCustomAxisTickHealth from '../components/statistics-components/RenderCustomAxisTickHealth';
import RenderCustomAxisTickPostsOrResidents from '../components/statistics-components/RenderCustomAxisTickPostsOrResidents';
import RenderCustomBarLabel from '../components/statistics-components/RenderCustomBarLabel';
import IconAndData from '../components/statistics-components/IconAndData';

import { getStatsDoc } from '../firebase/db/stats';

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

interface nameAndTotal {
  name: string;
  total: number;
}

interface nameAndResidentes {
  name: string;
  residentes: number;
}

interface totalAndCountByCase {
  total: number;
  countByCase: number[];
}

const StatisticsPage: React.FC = () => {
  const [dataGeneralCount, setDataGeneralCount] = useState<
    totalAndCountByCase
  >();
  const [dataPostsAdministration, setDataPostsAdministration] = useState<
    nameAndTotal[]
  >();
  const [
    dataResidentsAdministration,
    setDataResidentsAdministration,
  ] = useState<nameAndTotal[]>();
  const [dataMood, setDataMood] = useState<nameAndResidentes[]>();
  const [dataHealth, setDataHealth] = useState<nameAndResidentes[]>();

  const [dataCountReportsGenerated, setDataCountReportsGenerated] = useState<
    nameAndTotal[]
  >();
  const colorsCountReportsGenerated = ['#77B255', '#EA596E'];

  const [dataCountSpecialCases, setDataCountSpecialCases] = useState<
    totalAndCountByCase
  >();

  const forRenderingGeneralCount = [
    {
      message: 'Total de publicaciones',
      state: 'post',
    },
    {
      message: 'Total de residentes',
      state: 'senior',
    },
    {
      message: 'Total de reportes de estado',
      state: 'doctor',
    },
  ];

  const forRenderingPostAndResidentsCharts = [
    {
      message1: 'Publicaciones',
      message2: 'Altas, actualizaciones y bajas',
      data: dataPostsAdministration,
      dataKeyX: 'name',
      dataKeyY: 'total',
    },
    {
      message1: 'Residentes',
      message2: 'Altas, actualizaciones y bajas',
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

  useEffect(() => {
    getStatsDoc().then((value) => {
      const statsDocArr = value.statsCollection;
      const postsOperationsCount = statsDocArr.find(
        (object) => object.statsName === 'postsOperationsCount',
      );
      if (postsOperationsCount !== undefined) {
        setDataPostsAdministration([
          { name: 'Altas', total: postsOperationsCount.registrations },
          { name: 'Actualizaciones', total: postsOperationsCount.updates },
          { name: 'Bajas', total: postsOperationsCount.deletions },
        ]);
      }

      const residentsOperationsCount = statsDocArr.find(
        (object) => object.statsName === 'residentsOperationsCount',
      );
      if (residentsOperationsCount !== undefined) {
        setDataResidentsAdministration([
          { name: 'Altas', total: residentsOperationsCount.registrations },
          { name: 'Actualizaciones', total: residentsOperationsCount.updates },
          { name: 'Bajas', total: residentsOperationsCount.deletions },
        ]);
      }

      const generalCount = statsDocArr.find(
        (object) => object.statsName === 'generalCount',
      );
      if (generalCount !== undefined) {
        setDataGeneralCount({
          total: -1,
          countByCase: [
            generalCount.totalPosts,
            generalCount.totalResidents,
            generalCount.totalReports,
          ],
        });
      }
    });

    setDataCountReportsGenerated([
      { name: 'Generados', total: 10 },
      { name: 'No generados', total: 6 },
    ]);

    setDataMood([
      { name: 'Muy felíz', residentes: 4 },
      { name: 'Felíz', residentes: 3 },
      { name: 'Neutro', residentes: 2 },
      { name: 'Triste', residentes: 3 },
      { name: 'Muy triste', residentes: 1 },
    ]);

    setDataHealth([
      { name: 'Saludable', residentes: 4 },
      { name: 'Poco enfermo', residentes: 3 },
      { name: 'Enfermo', residentes: 3 },
      { name: 'Muy enfermo', residentes: 2 },
      { name: 'Peligro', residentes: 1 },
    ]);

    setDataCountSpecialCases({
      total: 20,
      countByCase: [5, 4, 11, 19, 2],
    });
  }, []);

  return (
    <div>
      <PageTitle message={'Estadísticas'} />
      <Divisor />
      <div css={styledReportDiv}>
        <PageTitle message={'Generales'} />
        {dataGeneralCount &&
          forRenderingGeneralCount.map(({ message, state }, index) => (
            <div key={`Resident state ${index}`}>
              <p css={pStyled}>{message}</p>
              <IconAndData
                state={state}
                value={dataGeneralCount.countByCase[index]}
                total={dataGeneralCount.total}
              />
            </div>
          ))}
      </div>

      <Divisor />

      <div css={styledReportDiv}>
        <PageTitle message={'Total de operaciones'} />
        {forRenderingPostAndResidentsCharts.map(
          ({ message1, message2, data, dataKeyX, dataKeyY }, index) => (
            <div key={`PostAndResidentChart ${index}`}>
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
      </div>

      <Divisor />

      <div css={styledReportDiv}>
        <PageTitle message={'En los últimos 7 días'} />

        <h2>Reportes de estado anímico</h2>
        <p css={pStyled}>
          Residentes que cuentan con reporte de estado y los que no
        </p>
        <div css={chartGeneralStyle}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                isAnimationActive={true}
                data={dataCountReportsGenerated}
                dataKey="total"
                fill="#8884d8"
                label
              >
                {dataCountReportsGenerated &&
                  colorsCountReportsGenerated.map((entry, index) => (
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
          (
            { message1, message2, data, dataKeyX, dataKeyY, customLabel },
            index,
          ) => (
            <div key={`Health and mood chart ${index}`}>
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
        {dataCountSpecialCases &&
          forRenderingStates.map(({ message, state }, index) => (
            <div key={`Resident state ${index}`}>
              <p css={pStyled}>{message}</p>
              <IconAndData
                state={state}
                value={dataCountSpecialCases.countByCase[index]}
                total={dataCountSpecialCases.total}
              />
            </div>
          ))}
      </div>
      <Divisor />
    </div>
  );
};

export default StatisticsPage;
