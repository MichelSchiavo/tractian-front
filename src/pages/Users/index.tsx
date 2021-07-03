import { useEffect } from 'react';
import { useState } from 'react';
import { Header } from '../../components/Header/index';
import { api } from '../../utils/services/api';
import { userProps } from '../../utils/types/types';

import './styles.scss';



export function Users() {
  const [ users, setUsers ] = useState<userProps[]>([]);

  useEffect(() => {
    api.get('users').then(({data}) => {
        setUsers(data);
    });
  } ,[])

  return (
    <>
      <Header />
      <main className="users-main">
        {users.map((user) => (
          <div key={user.id}>
            <p>E-mail: <span>{user.email}</span></p>
            <p>Nome: <span>{user.name}</span></p>
            <p>Unidade: <span>{user.unitId}</span></p>
            <p>Empresa: <span>{user.companyId}</span></p>
          </div>
       ))}
      </main>
    </>
  )
}