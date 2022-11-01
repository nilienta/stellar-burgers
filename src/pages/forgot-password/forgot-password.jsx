import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './forgot-password.module.css';
import Header from '../../components/header/header';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { checkingEmail } from '../../services/actions/checking-mail';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();

  const { emailExists, possibleEmail, isAuth } = useSelector(
    (state) => state.auth
  );
  const [value, setValue] = useState({ email: possibleEmail });

  let forgotPassword = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(checkingEmail(value));
    },
    [value]
  );
  if (emailExists) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password',
        }}
      />
    );
  }

  if (isAuth) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form className={styles.form}>
            <h1 className="text text_type_main-medium">
              Восстановление пароля
            </h1>
            <EmailInput
              placeholder="Укажите e-mail"
              onChange={(e) => setValue({ email: e.target.value })}
              value={value.email}
              name={'email'}
              autoComplete="on"
            />
            <Button
              onClick={forgotPassword}
              type="primary"
              size="large"
              htmlType="submit"
            >
              Восстановить
            </Button>
          </form>
          <p className="text text_type_main-default text_color_inactive mt-20">
            Вспомнили пароль?{' '}
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;