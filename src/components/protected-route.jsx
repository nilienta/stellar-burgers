import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { getCookie } from '../utils/cookie';
import Loader from '../pages/loader/loader';

export function ProtectedRoute({ children, ...rest }) {
  const { isAuth } = useSelector((state) => state.auth);
  const location = useLocation();
  const isAuthorized = getCookie('accessToken');

  if (!isAuth && !isAuthorized) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      </Route>
    );
  }

  if (!isAuth && isAuthorized) {
    return <Loader />;
  }

  return <Route {...rest}>{children}</Route>;
}
