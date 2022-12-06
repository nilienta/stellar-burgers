import { useCallback, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/types';
import { Redirect, useLocation } from 'react-router-dom';
import { SET_POSSIBLE_EMAIL } from '../../services/actions/login';
import styles from './login.module.css';
import Loader from '../loader/loader';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { signIn } from '../../services/actions/login';
import { useForm } from '../../services/hooks/use-form';

type LocationState = {
  background?: Location;
  from?: string;
};

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<LocationState>();

  const { values, handleChange } = useForm({
    email: 'anml@yandex.ru',
    password: 'password1!',
    name: 'Username',
  });

  const { isAuth, loader } = useAppSelector((state) => state.auth);
  const login = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      dispatch(signIn(values));
      dispatch({
        type: SET_POSSIBLE_EMAIL,
        possibleEmail: values.email,
      });
    },
    [values, dispatch]
  );

  if (isAuth) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <form className={styles.form} onSubmit={login}>
                <h1 className="text text_type_main-medium">Вход</h1>
                <EmailInput
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email!}
                  name={'email'}
                  autoComplete="on"
                />
                <PasswordInput
                  placeholder="Пароль"
                  onChange={handleChange}
                  value={values.password!}
                  name={'password'}
                  autoComplete="on"
                />
                <Button type="primary" size="large" htmlType="submit">
                  Войти
                </Button>
              </form>
              <p className="text text_type_main-default text_color_inactive mt-20">
                Вы — новый пользователь?{' '}
                <Link to="/register" className={styles.link}>
                  Зарегистрироваться
                </Link>
              </p>
              <p className="text text_type_main-default text_color_inactive mt-4">
                Забыли пароль?{' '}
                <Link to="/forgot-password" className={styles.link}>
                  Восстановить пароль
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginPage;
