import React from 'react';
import Router from 'router';
import Layout from 'components/layout';
import Header from './components/header';

function App(): JSX.Element {
  return (
    <Layout>
      <Header />
      <Router />
    </Layout>
  );
}

export default App;
