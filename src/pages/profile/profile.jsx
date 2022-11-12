import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.css';
import {
  Input,
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import MenuProfile from '../../components/menu-profile/menu-profile';
import { validateForm } from '../../utils/validate-form';
import { updateUserData } from '../../services/actions/login';
import { useForm } from '../../components/hooks/useForm';

const ProfilePage = () => {
  const [fieldDisabledName, setDisabledName] = useState(true);
  const [errorName, setErrorName] = useState(false);
  const [fieldDisabledPassword, setDisabledPassword] = useState(true);
  const [errorPassword, setErrorPassword] = useState(false);

  const { name, email } = useSelector((state) => state.auth.user);

  const initialState = {
    email: email,
    password: 'password1!',
    name: name,
  };

  const { values, handleChange, setValues } = useForm(initialState);

  const validateFieldName = (type, value) => {
    setErrorName(!validateForm(type, value));
  };
  const validateFieldPassword = (type, value) => {
    setErrorPassword(!validateForm(type, value));
  };

  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  const onIconClickName = (e) => {
    setDisabledName(false);
    setTimeout(() => nameRef.current?.focus(), 0);
  };
  const onIconClickPassword = (e) => {
    setDisabledPassword(false);
    setTimeout(() => passwordRef.current?.focus(), 0);
  };

  const onFocusName = () => {
    setErrorName(false);
  };
  const onFocusPassword = () => {
    setErrorPassword(false);
  };

  const onBlurName = (e) => {
    if (e.target.value) {
      validateFieldName(e.target.type, e.target.value);
    } else {
      setErrorName(false);
    }
    setDisabledName(true);
  };
  const onBlurPassword = (e) => {
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
  const dispatch = useDispatch();
  const onSave = (e) => {
    e.preventDefault();
    if (!errorName && !errorPassword) {
      dispatch(updateUserData(body));
    }
  };
  const onReset = (e) => {
    e.preventDefault();
    setValues(initialState);
    setErrorName(false);
    setErrorPassword(false);
  };

  return (
    <div className={`${styles.wrapper}`}>
      <main className={`${styles.main}`}>
        <MenuProfile />
        <section className={styles.container}>
          <form className={styles.form} onSubmit={onSave}>
            <Input
              placeholder="Имя"
              onChange={handleChange}
              value={values.name}
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
              value={values.email}
              name={'email'}
              isIcon={true}
              autoComplete="on"
            />
            <Input
              placeholder="Пароль"
              onChange={handleChange}
              value={values.password}
              name={'password'}
              autoComplete="on"
              type={'password'}
              icon={'EditIcon'}
              ref={passwordRef}
              onBlur={onBlurPassword}
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

export default ProfilePage;
