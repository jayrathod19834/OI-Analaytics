import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const User = React.lazy(() =>
  import(/* webpackChunkName: "viwes-user" */ './user')
);
const Company = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './company')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/user`} />
            <Route
              path={`${match.url}/user`}
              render={(props) => <User {...props} />}
            />
            <Route
              path={`${match.url}/company`}
              render={(props) => <Company {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
