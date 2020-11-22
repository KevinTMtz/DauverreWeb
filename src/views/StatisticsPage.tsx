import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

import { getStatsDoc, restartOperationsCount } from '../firebase/db/stats';
import { getResidents } from '../firebase/db/residents';
import { getReports } from '../firebase/db/reports';
import { BGColor } from '../components/EditAndDeleteButton';

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

const restartOperationsButton = css({
  backgroundColor: BGColor.View,
  width: '70%',
  borderRadius: '10px',
  fontSize: '18px',
  border: 'none',
  color: 'white',
  padding: '10px 15px',
  transitionDuration: '0.3s',
  ':hover': {
    transform: 'scale(1.01)',
  },
  '@media (max-width: 600px)': {
    width: '90%',
  },
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [
    dataGeneralCount,
    setDataGeneralCount,
  ] = useState<totalAndCountByCase>();
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

  const [
    dataCountSpecialCases,
    setDataCountSpecialCases,
  ] = useState<totalAndCountByCase>();

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

  const restartOperationsCountUseState = () => {
    setDataPostsAdministration([
      { name: 'Altas', total: 0 },
      { name: 'Actualizaciones', total: 0 },
      { name: 'Bajas', total: 0 },
    ]);
    setDataResidentsAdministration([
      { name: 'Altas', total: 0 },
      {
        name: 'Actualizaciones',
        total: 0,
      },
      { name: 'Bajas', total: 0 },
    ]);
    restartOperationsCount();
    handleClose();
  };

  useEffect(() => {
    getStatsDoc().then((value) => {
      const statsDocArr = (value as SuccessAndStats).statsCollection;
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

      getResidents().then((resArr) =>
        Promise.all(
          resArr.map((resident) =>
            getReports(resident.residentID).then((value) => {
              return value
                .sort((a, b) => b.date.getDate() - a.date.getDate())
                .slice(0, 1)
                .filter(
                  (report) =>
                    report.date >
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                );
            }),
          ),
        ).then((r) => {
          const filteredReporstArr = r.flat(1);

          setDataCountReportsGenerated([
            { name: 'Generados', total: filteredReporstArr.length },
            {
              name: 'No generados',
              total: generalCount.totalResidents - filteredReporstArr.length,
            },
          ]);

          const dataMoodTemp = [
            { name: 'Muy felíz', residentes: 0 },
            { name: 'Felíz', residentes: 0 },
            { name: 'Neutro', residentes: 0 },
            { name: 'Triste', residentes: 0 },
            { name: 'Muy triste', residentes: 0 },
          ];

          const dataHealthTemp = [
            { name: 'Saludable', residentes: 0 },
            { name: 'Poco enfermo', residentes: 0 },
            { name: 'Enfermo', residentes: 0 },
            { name: 'Muy enfermo', residentes: 0 },
            { name: 'Peligro', residentes: 0 },
          ];

          const dataCountSpecialCasesTemp = {
            total: filteredReporstArr.length,
            countByCase: [0, 0, 0, 0, 0],
          };

          filteredReporstArr.forEach((report) => {
            dataMoodTemp[report.mood - 1].residentes += 1;
            dataHealthTemp[report.health - 1].residentes += 1;
            dataCountSpecialCasesTemp.countByCase[0] += +report.sad;
            dataCountSpecialCasesTemp.countByCase[1] += +report.angry;
            dataCountSpecialCasesTemp.countByCase[2] += +report.rested;
            dataCountSpecialCasesTemp.countByCase[3] += +report.wellFed;
            dataCountSpecialCasesTemp.countByCase[4] += +report.lonely;
          });

          setDataMood(dataMoodTemp);
          setDataHealth(dataHealthTemp);
          setDataCountSpecialCases(dataCountSpecialCasesTemp);
        }),
      );
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
        <button css={restartOperationsButton} onClick={handleOpen}>
          Reiniciar conteo de operaciones
        </button>
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

        <PageTitle
          message={'De los residentes que cuentan con reporte de estado'}
        />
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

        <h3>Situaciones especiales de los reportes</h3>
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Reiniciar conteo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {'¿Estás seguro que quieres reiniciar el conteo de operaciones?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={restartOperationsCountUseState} color="secondary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StatisticsPage;
