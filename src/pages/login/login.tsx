import { useCallback, FC } from 'react';
import { Redirect, useLocation, Link } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { Loader } from '../loader/loader';
import { SET_POSSIBLE_EMAIL, signIn } from '../../services/actions/login';
import { useAppDispatch, useAppSelector } from '../../services/types/types';
import { useForm } from '../../services/hooks/use-form';
import { Head } from '../../components/head/head';
import styles from './login.module.css';

type LocationState = {
  background?: Location;
  from?: string;
};

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<LocationState>();

  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: '',
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

  const LinkSignInAndRecoveryPassword = () => {
    return (
      <>
        <Head title="Вход - Stellar-Burgers" />
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
      </>
    );
  };
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
              <LinkSignInAndRecoveryPassword />
            </div>
          </div>
        </>
      )}
    </>
  );
};
