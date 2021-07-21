import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import axios from 'axios';

import { meAPI } from '../lib/api/auth';

import { cookieStringToObject } from '../lib/utils';

import { wrapper } from '../store';
import { userActions } from '../store/user';

import GlobalStyle from '../styles/GlobalStyle';

import Header from '../components/Header';

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Next-Airbnb</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <div id='root-modal' />
    </>
  );
};

app.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  const { store } = context.ctx;
  const { isLogged } = store.getState().user;

  try {
    if (!isLogged && cookieObject.access_token) {
      axios.defaults.headers.cookie = cookieObject.access_token;

      const { data } = await meAPI();

      store.dispatch(userActions.setLoggedUser(data));
    }
  } catch (e) {
    console.log(e);
  }
  return { ...appInitialProps };
};

// app.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
//   const cookieObject = cookieStringToObject(ctx.req?.headers.cookie);
//   const { isLogged } = store.getState().user;

//   try {
//     if (!isLogged && cookieObject.access_token) {
//       axios.defaults.headers.cookie = cookieObject.access_token;

//       const { data } = await meAPI();

//       store.dispatch(userActions.setLoggedUser(data));
//     }
//   } catch (e) {
//     console.log(e);
//   }

//   return {
//     pageProps: {
//       ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
//       pathname: ctx.pathname,
//     },
//   };
// });

export default wrapper.withRedux(app);
