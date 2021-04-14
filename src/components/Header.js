import { useContext } from 'react';
import { ErrorContext } from './context/ErrorContext';
import useSticky from './hooks/useSticky';
import Nav from './Nav';
import SnackBar from './snackbar/SnackBar';
import { Facebook, Instagram, Twitter, Youtube } from './icons';

const Header = () => {
  const [error, _] = useContext(ErrorContext);
  const { isSticky, element } = useSticky();
  return (
    <div>
      <div
        ref={element}
        className="py-2 px-4 flex items-center border-b-2 border-dashed border-gray-700"
      >
        <small>24/7 Customer Service: +6281 1422 0206</small>
        <ul className="social-links flex align-center text-primary mx-28">
          <li>
            <a
              href="https://www.facebook.com/codeytek"
              className="fa fa-facebook text-primary"
              target="_blank"
            >
              <Facebook />
            </a>
          </li>
          <li className="ml-2 mt-1">
            <a href="https://twitter.com/codeytek" target="_blank">
              <Twitter />
            </a>
          </li>
          <li className="ml-2 mt-1">
            <a
              href="https://youtube.com/ImranSayedDev"
              className="fa fa-youtube"
              target="_blank"
            >
              <Youtube />
            </a>
          </li>
          <li className="ml-2">
            <a
              href="https://www.instagram.com/codeytek_academy/"
              className="fa fa-instagram"
              target="_blank"
            >
              <Instagram />
            </a>
          </li>
        </ul>
        <small>Indonesia (id)</small>
      </div>
      <Nav sticky={isSticky} />
      {error && <SnackBar />}
    </div>
  );
};

export default Header;
