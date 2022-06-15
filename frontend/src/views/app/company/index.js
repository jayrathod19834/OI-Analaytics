import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Second = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './add')
);
const Second1 = React.lazy(() =>
  import(/* webpackChunkName: "second1" */ './list')
);
const Update = React.lazy(() =>
  import(/* webpackChunkName: "update" */ './update')
);
const SecondMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/add`} />
      <Route
        path={`${match.url}/add`}
        render={(props) => <Second {...props} />}
      />
      <Route
        path={`${match.url}/list`}
        render={(props) => <Second1 {...props} />}
      />
      <Route
        path={`${match.url}/update/:id`}
        render={(props) => <Update {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default SecondMenu;
