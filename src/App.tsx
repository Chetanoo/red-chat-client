import React from 'react';
import Router from 'router';
import Layout from 'components/layout';
import Navigation from 'components/navigation';

function App(): JSX.Element {
  return (
    <Layout>
      <Navigation />
      <Router />
    </Layout>
  );
}

export default App;
