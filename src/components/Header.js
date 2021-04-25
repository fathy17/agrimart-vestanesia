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
        className="py-2 px-8 flex items-center border-b-2 border-dashed border-gray-700"
      >
        <small className="text-xs lg:text-base">
          24/7 Customer Service: +6281 1422 0206
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
