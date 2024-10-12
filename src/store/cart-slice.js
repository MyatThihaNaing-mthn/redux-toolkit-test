import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const initialCartState = {
    items: [],
    totalQuantity: 0,

}
const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        addItemToCart(state, action){
            const newItem = action.payload
            state.totalQuantity++;
            const existingItem = state.items.find(item => item.id === newItem.id)
            console.log("existing item", state.items)
            if(!existingItem){
                
                state.items.push(
                    {
                        id: newItem.id,
                        price: newItem.price,
                        quantity: 1,
                        totalPrice: newItem.price,
                        name: newItem.title
                    }
                )

            }else{
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price
            }
            console.log(state.items)
        },
        removeItemFromCart(state, action){
            const id = action.payload;
            state.totalQuantity--;
            const existingItem = state.items.find(item => item.id === id)
            if(existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id)
            }else{
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price
            }
        }
    }
})

export const sendCartData = (cart) => {
    return ( async (dispatch)=> {
        dispatch(uiActions.showNotification({status: "pending",
            title: "Sending",
            message: "Sending cart data..."
          }));

        const sendCart = async() => {
            await setDoc(doc( db, "carts", "cart1"), {
                cart
              }).catch(error => {
                throw new Error("Error updating cart");
              });
        }

        await sendCart().then(response=> {
            dispatch(uiActions.showNotification(
                {status: "succeed",
                  title: "succeed",
                  message: "Cart data updated..."
                }
              ))
        }).catch(error=> {
            dispatch(uiActions.showNotification(
                {status: "error",
                  title: "error",
                  message: "Error sending cart data..."
                }
              ))
        })


    })
}

export default cartSlice;
export const cartActions = cartSlice.actions