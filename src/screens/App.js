import React from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// Import fontawesome helper and icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

// Import high-level components
import RequestTable from 'screens/RequestTable';
import RequestForm from 'screens/RequestForm';

// Import Bootstrap styles (shared by all components)
import 'bootstrap/dist/css/bootstrap.css';

// Initialize custom fontawesome library with icons
library.add(faCalendarAlt);

// App component with routes
export const App = () => (
  <>
    <Route exact path="/" component={RequestTable} />
    <Route exact path="/form" component={RequestForm} />
  </>
);

export default hot(module)(App);
