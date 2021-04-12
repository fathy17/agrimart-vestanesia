import Head from 'next/head';
import { AppProvider } from './context/AppContext';
import Header from './Header';
import Footer from './Footer';
import client from './ApolloClient';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ApolloProvider } from '@apollo/client';
import { ErrorProvider } from './context/ErrorContext';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Layout = (props) => {
  return (
    <AppProvider>
      <ErrorProvider>
        <ApolloProvider client={client}>
          <div>
            <Head>
              <title>Woocommerce React Theme</title>
            </Head>
            <Header />
            {props.children}
            <Footer />
          </div>
        </ApolloProvider>
      </ErrorProvider>
    </AppProvider>
  );
};

export default Layout;
