import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useEffect, useCallback, useRef} from 'react';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from './firebase/firebase';
import { uiActions } from './store/ui-slice';
import Notification from './components/Notification/Notification';
function App() {
  const isCartVisible = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart);
  const firstRender = useRef(true);
  const dispatch = useDispatch();
  const notification = useSelector(state=> state.ui.notification)

  const postCart = useCallback(async () => {
    dispatch(uiActions.showNotification({status: "pending",
      title: "Sending",
      message: "Sending cart data..."
    }));
    await setDoc(doc(db, "carts", "cart1"), {
      cart
    }).catch(error => {
      throw new Error("Error updating cart");
    });
  }, [cart, dispatch])

  useEffect(()=> {
    const sendCartData = async() => {
      if(firstRender.current === false){
        try{
          await postCart();
          dispatch(uiActions.showNotification(
            {status: "succeed",
              title: "succeed",
              message: "Cart data updated..."
            }
          ))
        }catch(error){
          dispatch(uiActions.showNotification(
            {status: "error",
              title: "error",
              message: "Error sending cart data..."
            }
          ))
        }
      }
    }
    sendCartData();
    firstRender.current = false;
  }, [cart, postCart, dispatch])
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
