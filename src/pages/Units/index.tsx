import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/index';
import { api } from '../../utils/services/api';
import { UnitProps } from '../../utils/types/types';

import './styles.scss';

export function Units() {
  const [ units, setUnits ] = useState<UnitProps[]>([]);

  useEffect(() => {
    api.get('units').then(({data}) => {
      setUnits(data);
    });
  } ,[]);

  return (
    <>
      <Header />
      <main className="units-main">
        {units.map((unit) => (
          <div key={unit.id}>
            <p>Unit: <span>{unit.name}</span> </p>
          </div>
        ))}
      </main>
    </>
  )
}