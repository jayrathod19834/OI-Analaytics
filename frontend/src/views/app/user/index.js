import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Start = React.lazy(() =>
  import(/* webpackChunkName: "add" */ './add')
);
const Start1 = React.lazy(() =>
  import(/* webpackChunkName: "start1" */ './list')
);
const Start2 = React.lazy(() =>
  import(/* webpackChunkName: "start1" */ './update')
);
const Gogo = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/add`} />
      <Route
        path={`${match.url}/add`}
        render={(props) => <Start {...props} />}
      />
      <Route
        path={`${match.url}/list`}
        render={(props) => <Start1 {...props} />}
      />
      <Route
        path={`${match.url}/update/:id`}
        render={(props) => <Start2 {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Gogo;
