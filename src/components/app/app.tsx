import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../utils/types';
import { getCookie } from '../../utils/cookie';
import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import OrderFeedPage from '../../pages/order-feed/order-feed';
import ProfilePage from '../../pages/profile/profile';
import OrderHistoryPage from '../../pages/order-history/order-history';
import OrderPage from '../../pages/order/order';
import IngredientPage from '../../pages/ingredient/ingredient-page';
import NotFound404 from '../../pages/404/404';
import { ProtectedRoute } from '../protected-route';
import { getUser } from '../../services/actions/login';
import { SET_INVISIBLE_MODAL_INGREDIENT } from '../../services/actions/app';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Modal from '../modal/modal';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import Header from '../header/header';
import { BASE_URL } from '../../services/actions/app';
import { getIngredients } from '../../services/actions/app';
import { Location } from 'history';

type LocationState = {
  background?: Location;
};

export default function App() {
  const NORMA_API = BASE_URL + '/ingredients';
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getIngredients(NORMA_API));
  }, [dispatch]);

  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
  }, [dispatch]);

  const ModalSwitch = () => {
    const location = useLocation<LocationState>();
    const history = useHistory();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
      dispatch({
        type: SET_INVISIBLE_MODAL_INGREDIENT,
      });
      history.goBack();
    };

    const { ingredients } = useAppSelector((state) => state.app);

    return (
      <>
        <Header />
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientPage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <Route path="/feed" exact={true}>
            <OrderFeedPage />
          </Route>
          <Route path="/feed/:id" exact={true}>
            <OrderPage />
          </Route>
          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact={true}>
            <OrderHistoryPage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders/:id" exact={true}>
            <OrderPage />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
        {ingredients !== null && ingredients.length > 0 && background && (
          <Route
            path="/ingredients/:id"
            children={
              <Modal
                onClose={handleModalClose}
                size="medium"
                header="Детали ингредиента"
              >
                <IngredientDetails />
              </Modal>
            }
          />
        )}
      </>
    );
  };

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}
