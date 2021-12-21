import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider'

function CheckoutProduct({id, img, title, price, rating}) {
    const [ {basket}, dispatch ] = useStateValue();
     const removeFromBasket = () => {
         dispatch({
             type: "REMOVE_FROM_BASKET",
             id: id
         })
     }
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image " src={img} alt=""></img>
            <div className="checkoutProduct__info ">
                <p className="checkoutProduct__title">
                 {title}
                </p>
                <div className ="price">
                    <small>$</small>
                    <strong>{price}</strong>
                </div>
                <div className="checkoutProduct__rating ">
                {
                    Array(rating)
                    .fill()
                    .map((_, i) => {
                        return <p>⭐</p>
                    })
                }
                </div>
                <button onClick={removeFromBasket}>Remove from basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
