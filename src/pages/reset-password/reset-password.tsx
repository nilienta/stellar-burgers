import { useCallback, FC, FormEvent } from 'react';
import styles from './reset-password.module.css';

import { Redirect } from 'react-router';
import {
  Button,
  PasswordInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { passwordSaveReset } from '../../services/actions/reset-password';

import { useAppDispatch, useAppSelector } from '../../services/types/types';
import { useForm } from '../../services/hooks/use-form';

const ResetPasswordPage: FC = () => {
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm({
    password: '',
    token: '',
  });

  const resetPassword = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(passwordSaveReset(values));
    },
    [values, dispatch]
  );
  const { isAuth, emailExists } = useAppSelector((state) => state.auth);

  if (!emailExists) {
    return (
      <Redirect
        to={{
          pathname: '/forgot-password',
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={resetPassword}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <PasswordInput
            placeholder="Введите новый пароль"
            onChange={handleChange}
            value={values.password!}
            name={'password'}
            autoComplete="on"
          />
          <Input
            placeholder="Введите код из письма"
            type={'text'}
            value={values.token!}
            name={'token'}
            onChange={handleChange}
            autoComplete="on"
          />
          <Button type="primary" size="large" htmlType="submit">
            Сохранить
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
  );
};

export default ResetPasswordPage;
