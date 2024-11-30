import { Link } from "react-router-dom"
import { FaRegTrashAlt } from "react-icons/fa";
import { Fragment, useState } from "react";
import {toast} from 'react-toastify'


const CartPage = ({cartItems, setCartItems}) => {

    const [complete, setComplete] = useState(false)

    const increaseQty = (item) => {
        if(item.product.stock == item.qty){
            return;
        }
        const updatedCartItems = cartItems.map((i)=> {
            if(i.product._id == item.product._id){
                i.qty++
            }
            return i
        })
        setCartItems(updatedCartItems)
    }

    const decreaseQty = (item) => {
        if(item.qty > 1){
            const updatedCartItems = cartItems.map((i)=>{
                if(i.product._id==item.product._id){
                    i.qty--
                }
                return i
            })
            setCartItems(updatedCartItems)
        }
    }

    const removeCartItems = (item) => {
        const updatedCartItems = cartItems.filter((i)=>{
            if(i.product._id != item.product._id){
                return i
            }
        })
            setCartItems(updatedCartItems)
    }

    const placeOrder = () => {
        fetch(import.meta.env.VITE_BASE_URL+"/order",{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(cartItems)
        })
        .then(()=> {
            setCartItems([])
            setComplete(true)
            toast.success("Order Success")
        })
    }

    return(
        cartItems.length > 0 ? <Fragment>
        <div className="container container-fluid">
        <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
                {console.log(cartItems)}
                {cartItems.map((items) => 
                    (
                    <Fragment>
                        <hr />
                        
                    <div className="cart-item">
                        <div className="row">
                            <div className="col-4 col-lg-3">
                                <img src={items.product.images[0].image} alt={items.product.name} height="90" width="115"/>
                            </div>
    
                            <div className="col-5 col-lg-3">
                                <Link to={"/product/"+items.product._id}>{items.product.name}</Link>
                            </div>
    
    
                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p id="card_item_price">${items.product.price}</p>
                            </div>
    
                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus" onClick={()=>decreaseQty(items)}>-</span>
                                    <input type="number" className="form-control count d-inline" value={items.qty}readOnly />
                                    <span className="btn btn-primary plus" onClick={()=>increaseQty(items)}>+</span>
                                </div>
                            </div>
    
                            <div className="col-4 col-lg-1 mt-4 mt-lg-0" onClick={()=>removeCartItems(items)}>
                                <FaRegTrashAlt color="red" size={"20px"}/>
                            </div>
    
                        </div>
                    </div>
                    </Fragment> 
                    )
                )}
                
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values"> {cartItems.reduce((acc,item)=>(acc + item.qty),0)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item)=>(acc + (item.product.price * item.qty)),0)}</span></p>
    
                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={placeOrder}>Place Order</button>
                </div>
            </div>
        </div>
    </div>
    </Fragment> : ((!complete) ? <Fragment><h2 className='mt-5' style={{textAlign:"center"}}>Your Cart is Empty !!!</h2></Fragment>
        : <Fragment><h2 className="mt-5" style={{textAlign:"center"}}>Order Success!</h2><p style={{textAlign:"center"}}>Your Order placed successfully.</p></Fragment>)
    )
}

export default CartPage