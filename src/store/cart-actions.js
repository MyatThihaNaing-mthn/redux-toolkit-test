import { uiActions } from "./ui-slice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart) => {
    return (async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Sending",
            message: "Sending cart data..."
        }));

        const sendCart = async () => {
            await setDoc(doc(db, "carts", "cart1"), {
                items: cart.items,
                totalQuantity: cart.totalQuantity
            }).catch(error => {
                throw new Error("Error updating cart");
            });
        }

        await sendCart().then(response => {
            dispatch(uiActions.showNotification(
                {
                    status: "succeed",
                    title: "succeed",
                    message: "Cart data updated..."
                }
            ))
        }).catch(error => {
            dispatch(uiActions.showNotification(
                {
                    status: "error",
                    title: "error",
                    message: "Error sending cart data..."
                }
            ))
        })


    })
}

export const fetchCart = () => {
    return (
        async (dispatch) => {
            const fetchData = async () => {
                const cart1Ref = doc(db, "carts", "cart1");
                const cart1Snap = await getDoc(cart1Ref);
                if (!cart1Snap.exists) {
                    throw new Error("Error fetching cart")
                }
                console.log(cart1Snap.data())
                return cart1Snap.data();
            }
            try {
                const cartData = await fetchData()
                dispatch(cartActions.replaceCart(cartData))
            } catch (error) {
                console.log("error fetching cart", error)
                dispatch(uiActions.showNotification(
                    {
                        status: "error",
                        title: "error",
                        message: "Error fetching cart data..."
                    }
                ))
                dispatch(cartActions.replaceCart(
                    {
                        items: [],
                        totalQuantity: 0,
                        replaced: false
                    }
                ))
            }
        }
    )
}
