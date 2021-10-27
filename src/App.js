import {useSelector, useDispatch} from 'react-redux';
import {Fragment, useEffect} from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui-slice';
import { fetchCartData, sendCartData } from './store/cart-actions';


let initialState = true;

function App() {
  const showCart = useSelector(state => state.ui.showCart);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    /*const sendData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'sending...',
        message: 'sending cart data!'
      }));
      const response = await fetch(
        'https://cart-4eb93-default-rtdb.firebaseio.com/cartDB.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      });
      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }
      //const responseData = await response.json(); //b7wl l js object
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'success!',
        message: 'sending cart data successfully'
      }));
    }*/
    if (initialState) { //3l4an myb3t4 l awl mara
      initialState = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
    /*sendData().catch(err => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'error!!',
        message: 'sending cart data failed'
      }));
    })*/
    
  }, [cart, dispatch])
  return (
    <Fragment>
      {notification && <Notification 
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {showCart &&
        <Cart /> }
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
