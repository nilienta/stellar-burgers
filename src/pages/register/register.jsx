import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { register } from '../../services/actions/register';
import styles from './register.module.css';
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useForm } from '../../components/hooks/useForm';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const registration = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(register(values));
    },
    [values]
  );

  const { isAuth } = useSelector((state) => state.auth);

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
        <form className={styles.form} onSubmit={registration}>
          <h1 className="text text_type_main-medium">Регистрация</h1>
          <Input
            placeholder="Имя"
            type={'text'}
            value={values.name}
            name={'name'}
            onChange={handleChange}
            autoComplete="on"
          />
          <EmailInput
            placeholder="Email"
            onChange={handleChange}
            value={values.email}
            name={'email'}
            autoComplete="on"
          />
          <PasswordInput
            placeholder="Пароль"
            onChange={handleChange}
            value={values.password}
            name={'password'}
            autoComplete="on"
          />
          <Button type="primary" size="large" htmlType="submit">
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Уже зарегистрированы?{' '}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
