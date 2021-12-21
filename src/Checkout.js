import React from 'react'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'


function Checkout() {
    const [ {basket, user}, dispatch ] = useStateValue();
    console.log("basket...", basket)
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" 
                alt="">

                </img>
                <div className="checkout__title">
                    <h3>Hello, {user?.email} </h3>
                    <h1>Your shopping Basket</h1>
                    {basket.map((item) => {
                         return <CheckoutProduct
                         id={item.id}
                         title={item.title}
                         price={item.price}
                         rating={item.rating}
                         img={item.image} />
                    })}
                </div>
            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
