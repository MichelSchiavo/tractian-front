import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/index';
import { api } from '../../utils/services/api';
import { CompanyProps } from '../../utils/types/types';

import './styles.scss';

export function Companies() {
  const [ companies, setCompanies ] = useState<CompanyProps[]>([]);

  useEffect(() => {
    api.get('companies').then(({data}) => {
      setCompanies(data);
    });
  } ,[]);

  return (
    <>
      <Header />
      <main className="companies-main">
        {companies.map((company) => (
          <div key={company.id}>
            <p>Empresa: <span>{company.name}</span> </p>
          </div>
        ))}
      </main>
    </>
  )
}