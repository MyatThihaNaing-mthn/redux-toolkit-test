import { createSlice } from "@reduxjs/toolkit";

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

export default cartSlice;
export const cartActions = cartSlice.actions