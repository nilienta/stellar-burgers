import { useCallback, useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { SET_POSSIBLE_EMAIL } from '../../services/actions/login';
import styles from './login.module.css';
import Header from '../../components/header/header';
// import Loader from '../loader/loader';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { signIn } from '../../services/actions/login';

const LoginPage = () => {
  const dispatch = useDispatch();

  const [form, setValue] = useState({
    email: 'anml@yandex.ru',
    password: 'password1!',
    name: 'Username',
  });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const { isAuth, prevLocation, getDataRequest } = useSelector(
    (state) => state.auth
  );
  let login = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signIn(form));
      dispatch({
        type: SET_POSSIBLE_EMAIL,
        possibleEmail: form.email,
      });
    },
    [form]
  );
  if (isAuth) {
    return <Redirect to={prevLocation} />;
  }

  return (
    <>
      {/* {getDataRequest ? (
        <Loader />
      ) : (
        <> */}
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form className={styles.form}>
            <h1 className="text text_type_main-medium">Вход</h1>
            <EmailInput
              placeholder="Email"
              onChange={onChange}
              value={form.email}
              name={'email'}
              autoComplete="on"
            />
            <PasswordInput
              placeholder="Пароль"
              onChange={onChange}
              value={form.password}
              name={'password'}
              autoComplete="on"
            />
            <Button
              onClick={login}
              type="primary"
              size="large"
              htmlType="submit"
            >
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
      {/* </>
      )} */}
    </>
  );
};

export default LoginPage;
