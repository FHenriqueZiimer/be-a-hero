import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login';
import Register from './pages/Register';
import Incidents from './pages/Incidents';
import NewIncidents from './pages/NewIncidents';
import RecoverId from './pages/RecoverId';
import NotFound from './pages/404';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/incidents' exact component={Incidents} />
        <Route path='/incidents/new' exact component={NewIncidents} />
        <Route path='/recover' exact component={RecoverId} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default  Routes