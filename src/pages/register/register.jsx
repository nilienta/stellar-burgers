import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { register } from '../../services/actions/register';
import styles from './register.module.css';
import Header from '../../components/header/header';
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [form, setValue] = useState({
    email: '',
    password: '',
    name: '',
  });

  const onChange = (e) => {
    setValue(() => {
      return { ...form, [e.target.name]: e.target.value };
    });
  };

  let registration = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(register(form));
    },
    [form]
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
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form className={styles.form}>
            <h1 className="text text_type_main-medium">Регистрация</h1>
            <Input
              placeholder="Имя"
              type={'text'}
              value={form.name}
              name={'name'}
              onChange={onChange}
              autoComplete="on"
            />
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
              onClick={registration}
              type="primary"
              size="large"
              htmlType="submit"
            >
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
    </>
  );
};

export default RegisterPage;
