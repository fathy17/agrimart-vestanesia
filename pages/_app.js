import '../src/styles/style.scss';
import '../src/styles/main.scss';

import Router from 'next/router';
import NProgress from 'nprogress';
import { DefaultSeo } from 'next-seo';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo title="Vestanesia Agrimart" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
