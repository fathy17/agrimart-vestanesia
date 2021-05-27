import { useContext, useState } from 'react';
import { ErrorContext } from './context/ErrorContext';
import useSticky from './hooks/useSticky';
import Nav from './Nav';
import SnackBar from './snackbar/SnackBar';
import { Facebook, Instagram, Twitter, Youtube } from './icons';
import GET_FRONTPAGE_QUERY from '../queries/get-frontpage';
import { useQuery } from '@apollo/client';

const Header = () => {
  const [error, _] = useContext(ErrorContext);
  const { isSticky, element } = useSticky();
  const [telp, setTelp] = useState('');

  const { data } = useQuery(GET_FRONTPAGE_QUERY, {
    onCompleted: () => {
      setTelp(data?.extension?.frontPage?.noTelponCustomerService);
    },
  });

  return (
    <div>
      <div
        ref={element}
        className="py-2 px-8 flex items-center border-b-2 border-dashed border-gray-700"
      >
        <small className="text-xs lg:text-base">
          Customer Service (10.00 - 16.00 WITA): {telp}
        </small>
        <ul className="social-links flex align-center text-primary ml-4 md:ml-28 md:my-0 my-2">
          <li>
            <a
              href="https://www.facebook.com/Vestanesia-Agrimart-109438211286242"
              className="fa fa-facebook text-primary"
              target="_blank"
            >
              <Facebook />
            </a>
          </li>
          <li className="ml-2 mt-1">
            <a href="https://twitter.com/vestanesia" target="_blank">
              <Twitter />
            </a>
          </li>
          <li className="ml-2 mt-1">
            <a
              href="https://www.youtube.com/channel/UCpr94eeHBmez6QMbn4tMYwA"
              className="fa fa-youtube"
              target="_blank"
            >
              <Youtube />
            </a>
          </li>
          <li className="ml-2">
            <a
              href="https://www.instagram.com/vestanesiaagrimart/"
              className="fa fa-instagram"
              target="_blank"
            >
              <Instagram />
            </a>
          </li>
        </ul>
      </div>
      <Nav sticky={isSticky} />
      {error && <SnackBar />}
    </div>
  );
};

export default Header;
