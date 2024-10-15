import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useEffect, useRef} from 'react';
import Notification from './components/Notification/Notification';
import { fetchCart, sendCartData } from './store/cart-actions';

function App() {
  const isCartVisible = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart);
  const firstRender = useRef(true);
  const dispatch = useDispatch();
  const notification = useSelector(state=> state.ui.notification)

  useEffect(()=> {
    dispatch(fetchCart())
  }, [dispatch])

  useEffect(()=> {
    if(firstRender.current === true){
      firstRender.current = false
      return;
    }
    if(!cart.replaced){
      dispatch(sendCartData(cart))
    }
  }, [cart, dispatch])

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
