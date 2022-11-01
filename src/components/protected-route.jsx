import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SET_LOCATION } from '../services/actions/login';

export function ProtectedRoute({ children, ...rest }) {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_LOCATION,
      prevLocation: location,
    });
  }, []);

  return (
    <Route
      // Получим текущий маршрут, с которого произойдёт переадресация
      // для неавторизованного пользователя
      {...rest}
      render={() =>
        // Если пользователь есть, используем компонент, который передан в ProtectedRoute
        user ? (
          children
        ) : (
          // Если пользователя нет в хранилище, происходит переадресация на роут /login
          <Redirect
            // Передадим в пропс to не строку, а объект.
            to={{
              // Маршрут, на который произойдёт переадресация
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
}
