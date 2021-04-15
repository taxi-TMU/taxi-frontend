import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../context/UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  // problem is that user is undefined on first rendering
  // and gets redirected to /login which in turns redirects to /dashboard
  // because at that point we have a user

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
