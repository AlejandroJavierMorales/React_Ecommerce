import cart from './assets/carrito.png'
import './CartWidget.css';


const CartWidget = (onAddQty) => {



    return(
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <div>
                    <img className='imgCart' src={cart} alt="cart-widget"/>
                </div>
                <div className='qty'>
                    0
                </div>
            </div>
        </>
       
    )
}

export default CartWidget