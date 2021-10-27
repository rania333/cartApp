import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

//thunk
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
        uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!',
        })
        );

    const sendRequest = async () => {
        const response = await fetch(
            'https://cart-4eb93-default-rtdb.firebaseio.com/cartDB.json',
            {
            method: 'PUT',
            body: JSON.stringify({
                items: cart.items,
                totalQuantity: cart.totalQuantity
            }),
        }
        );

        if (!response.ok) {
            throw new Error('Sending cart data failed.');
        }
    };

    try {
        await sendRequest();

        dispatch(
            uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!',
        })
        );
    } catch (error) {
        dispatch(
            uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!',
            })
        );
    }
    };
};

export const fetchCartData = () => { //de b2a brtun x l app
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://cart-4eb93-default-rtdb.firebaseio.com/cartDB.json');
            if (!response.ok) {
                throw new Error('faild to fetch data');
            }
            const data = await response.json();
            return data;
        }
        try {
            const dataa = await fetchData();
            dispatch(cartActions.replaceCart({
                items: dataa.items || [],
                totalQuantity: dataa.totalQuantity,
            }));
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'fetching cart data failed!',
                })
            );
        }
    }
}