import { useContext } from 'react';
import { ErrorContext } from './context/ErrorContext';
import Nav from './Nav';
import SnackBar from './snackbar/SnackBar';

const Header = () => {
  const [error, _] = useContext(ErrorContext);
  return (
    <div className="header">
      <Nav />
      {error && <SnackBar />}
    </div>
  );
};

export default Header;
