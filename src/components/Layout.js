import Head from 'next/head';
import { AppProvider } from './context/AppContext';
import Header from './Header';
import Footer from './Footer';
import client from './ApolloClient';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ApolloProvider } from '@apollo/client';
import { ErrorProvider } from './context/ErrorContext';
import { useEffect } from 'react';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Layout = (props) => {
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    //change this according to your client-key
    const myMidtransClientKey = `${process.env.MIDTRANS_CLIENT_KEY_SANDBOX}`;

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <AppProvider>
      <ErrorProvider>
        <ApolloProvider client={client}>
          <Head>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
          </Head>
          <div className="text-gray-700">
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
