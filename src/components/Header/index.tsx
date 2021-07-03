import { useHistory } from 'react-router-dom';
import { RedirectButton } from '../../components/RedirectButton';

import './styles.scss';



export function Header() {
  const history = useHistory();
  

  function handleChangePage(target: string) {
    history.push(`/${target}`);
  }

  return (
    <div className="header">
      <img src="https://imgix.tractian.com/images/Logo-Tractian.svg" alt="Tractian logo" onClick={() => handleChangePage('')} />
      <main>
        <RedirectButton onClick={() => handleChangePage('')}>Home</RedirectButton>
        <RedirectButton onClick={() => handleChangePage('companies')}>Empresas</RedirectButton>
        <RedirectButton onClick={() => handleChangePage('units')}>Unidades</RedirectButton>
        <RedirectButton onClick={() => handleChangePage('users')}>Usuários</RedirectButton>
      </main>
    </div>
  )
}