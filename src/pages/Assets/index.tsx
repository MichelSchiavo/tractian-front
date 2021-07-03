import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';
import { Header } from '../../components/Header/index';
import { api } from '../../utils/services/api';
import { AssetsProps } from '../../utils/types/types';

import './styles.scss';

export function Assets() {
  const [ assets, setAssets ] = useState<AssetsProps[]>([]);
  const history = useHistory();

  useEffect(() => {
    api.get('assets').then(({data}) => {
      setAssets(data);
    });
  } ,[]);

  function handleLoadAsset(id: number) {
    history.push(`/assets/${id}`);
  }

  return (
    <>
      <Header />
      <main className="assets-main">
        {assets.map((asset) => (
          <div key={asset.id} className="assets-main-div" onClick={() => handleLoadAsset(asset.id)}>
            <img src={asset.image} alt="" />
            <div>
              <p>Nome: <span>{asset.name}</span></p>
              <p>Sensor: <span>{asset.sensors}</span></p>
              <p>Status: <span>{<FaCircle className={asset.status}/>}</span></p>
              <p>Saúde: <span>{asset.healthscore}%</span></p>
            </div>
          </div>
        ))}
      </main>
    </>
  )
}