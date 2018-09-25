import React from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// Import high-level components
import Layout from 'screens/app/Layout';
import RequestTable from 'screens/RequestTable';
import RequestForm from 'screens/RequestForm';

// Import Bootstrap styles (shared by all components)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

// App component with routes
export const App = () => (
  <Layout>
    <Route exact path="/" component={RequestTable} />
    <Route path="/form" component={RequestForm} />
  </Layout>
);

export default hot(module)(App);
