import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { Header } from '../../components/Header';
import { api } from '../../utils/services/api';
import { AssetsProps, CompanyProps, UnitProps, userProps } from '../../utils/types/types';

import './styles.scss';

type AssetParams = {
  id: string;
}

export function Asset() {
  const [ asset, setAsset ] = useState<AssetsProps>();
  const [ companies, setCompanies ] = useState<CompanyProps[]>([]);
  const [ actualComp, setActualComp ] = useState('')
  const [ units, setUnits ] = useState<UnitProps[]>([]);
  const [ actualUnit, setActualUnit ] = useState('');
  const [ users, setUsers ] = useState<userProps[]>([]);
  const [ actualUser, setActualUser ] = useState('');
  const params = useParams<AssetParams>();

  const chartOptions = {
    chart: {
      type: 'column',
      ignoreHiddenSeries:true,
      width: 300,
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Informação da unidade'
    },
    xAxis: {
      categories: [
        'Saúde'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'https://tractian.com'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.42,
        borderWidth: 0,
        color: asset?.status === 'inAlert' ? 'red' : asset?.status === 'inOperation' ? 'green' : 'gray'
      },
    },
    series: 
    [{
        name: asset?.name,
        data: [asset?.healthscore]
      }]
  };
  
  useEffect(() => {
    api.get(`assets/${params.id}`).then(({data}) => {
      setAsset(data);
    });
  });

  useEffect(() => {
    api.get(`companies`).then(({data}) => {
      setCompanies(data);
      if (asset) data[0] && setActualComp(data[Number(asset?.companyId)-1].name)
    });

    api.get('units').then(({data}) => {
      setUnits(data);
      if (asset) data[0] && setActualUnit(data[Number(asset?.unitId)-1].name)
    });

    api.get('users').then(({data}) => {
      setUsers(data);
  });

    
  } ,[asset]);

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <>
      <Header />
      <main className="asset-main">
          <img src={asset?.image} alt="Asset" />

        <div className="mainContainer">
          <div className="leftSide">
            <div>
              <p>Id: <span>{asset?.id}</span></p>
              <p>Sensor: <span>{asset?.sensors}</span></p>
              <p>Modelo: <span>{capitalizeFirstLetter(asset?.model || '')}</span></p>

              <p>Name: <span>{asset?.name}</span></p>
              {asset?.specifications.power && <p>Power: <span>{asset?.specifications.power}</span></p>}
              <p>MaxTemp: <span>{asset?.specifications.maxTemp}°</span></p>

              <p>Tempo de atividade de coleta total: <span>{asset?.metrics.totalCollectsUptime}</span></p>

              <p>Tempo total ligado: <span>{asset?.metrics.totalUptime}</span></p>

              <p>Última atualização: <span>{new Date(asset?.metrics.lastUptimeAt || '').toLocaleString()}</span></p>

              <p> Empresa:
                <select
                  name="empresa"
                  onChange={(e) => setActualComp(e.target.value)}
                >
                  <option>
                    {actualComp}
                  </option>
                  {companies.map((company, index) => (
                    company.name === actualComp ? '' : (
                      <option value={company.name} key={index}>
                        {company.name}
                      </option>
                    )
                  ))}
                </select>
              </p>

              <p> Unidade:
                <select
                  name="unidade"
                  onChange={(e) => setActualUnit(e.target.value)}
                >
                  <option>
                    {actualUnit}
                  </option>
                  {units.map((unit, index) => (
                    unit.name === actualUnit ? '' : (
                      <option value={unit.name} key={index}>
                        {unit.name}
                      </option>
                    )
                  ))}
                </select>
              </p>

              <p> Responsável:
                <select
                  name="responsável"
                  onChange={(e) => setActualUser(e.target.value)}
                >
                  <option>
                    {actualUser}
                  </option>
                  {users.map((user, index) => (
                    user.name === actualUser ? '' : (
                      <option value={user.name} key={index}>
                        {user.name}
                      </option>
                    )
                  ))}
                </select>
              </p>

            </div>
          </div>
          <div className="rightSide">
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
              />
          </div>
        </div>
    </main>
    </>
  )
}