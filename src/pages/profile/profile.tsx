import { useState, useRef, FC, FocusEvent } from 'react';
import {
  Input,
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect } from 'react-router-dom';

import { MenuProfile } from '../../components/menu-profile/menu-profile';
import { validateForm } from '../../utils/validate-form';
import { useAppDispatch, useAppSelector } from '../../services/types/types';
import { updateUserData } from '../../services/actions/change-user-data';
import { useForm } from '../../services/hooks/use-form';
import styles from './profile.module.css';

export const ProfilePage: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  if (!isAuth) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }
  const [fieldDisabledName, setDisabledName] = useState(true);
  const [errorName, setErrorName] = useState(false);
  const [fieldDisabledPassword, setDisabledPassword] = useState(true);
  const [errorPassword, setErrorPassword] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const initialState = {
    email: user?.email,
    password: 'password1!',
    name: user?.name,
  };

  const { values, handleChange, setValues } = useForm(initialState);

  const validateFieldName = (type: string, value: string) => {
    setErrorName(!validateForm(type, value));
  };
  const validateFieldPassword = (type: string, value: string) => {
    setErrorPassword(!validateForm(type, value));
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onIconClickName = () => {
    setDisabledName(false);
    setTimeout(() => nameRef.current?.focus(), 0);
  };
  const onIconClickPassword = () => {
    setDisabledPassword(false);
    setTimeout(() => passwordRef.current?.focus(), 0);
  };

  const onFocusName = () => {
    setErrorName(false);
  };
  const onFocusPassword = () => {
    setErrorPassword(false);
  };

  const onBlurName = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      validateFieldName(e.target.type, e.target.value);
    } else {
      setErrorName(false);
    }
    setDisabledName(true);
  };
  const onBlurPassword = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      validateFieldPassword(e.target.type, e.target.value);
    } else {
      setErrorPassword(false);
    }
    setDisabledPassword(true);
  };
  const body = {
    email: values.email,
    name: values.name,
  };
  const dispatch = useAppDispatch();
  const onSave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!errorName && !errorPassword) {
      dispatch(updateUserData(body));
    }
  };
  const onReset = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setValues(initialState);
    setErrorName(false);
    setErrorPassword(false);
  };

  return (
    <div className={`${styles.wrapper}`}>
      <main className={`${styles.main} mr-5 ml-5`}>
        <MenuProfile page="profile" />
        <section className={styles.container}>
          <form className={styles.form} onSubmit={onSave}>
            <Input
              placeholder="Имя"
              onChange={handleChange}
              value={values.name!}
              name={'name'}
              autoComplete="on"
              type={'text'}
              icon={'EditIcon'}
              ref={nameRef}
              onBlur={onBlurName}
              onFocus={onFocusName}
              error={errorName}
              disabled={fieldDisabledName}
              onIconClick={onIconClickName}
              errorText={'Ой, произошла ошибка!'}
              extraClass={styles.input}
            />
            <EmailInput
              placeholder="Логин"
              onChange={handleChange}
              value={values.email!}
              name={'email'}
              isIcon={true}
              autoComplete="on"
            />
            <Input
              placeholder="Пароль"
              onChange={handleChange}
              value={values.password!}
              name={'password'}
              autoComplete="on"
              type={'password'}
              icon={'EditIcon'}
              ref={passwordRef}
              onBlur={() => {
                onBlurPassword;
              }}
              onFocus={onFocusPassword}
              error={errorPassword}
              disabled={fieldDisabledPassword}
              onIconClick={onIconClickPassword}
              errorText={'Ой, произошла ошибка!'}
              extraClass={styles.input}
            />
            <section className={styles.footer}>
              <Button
                onClick={onReset}
                type="secondary"
                size="large"
                htmlType="reset"
              >
                Отмена
              </Button>
              <Button type="primary" size="large" htmlType="submit">
                Сохранить
              </Button>
            </section>
          </form>
        </section>
      </main>
    </div>
  );
};
