import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {toast} from 'react-toastify' 

const ProductDetail = ({cartItems, setCartItems}) => {

    const [product, setProduct] = useState(null)
    const {id} = useParams()

    const [qty,setQty] = useState(1)

    useEffect(()=>{
        fetch(import.meta.env.VITE_BASE_URL+"/product/"+id)
            .then(res => res.json())
                .then(resdata => setProduct(resdata.product))
                    .catch(error=>{
                        console.log("Error fetching API data",error)
                    })
    },[])

    const addToCart = () => {
        const isItemExists = cartItems.find((item)=> item.product._id == product._id)
        if(!isItemExists){
            const newItems = {product, qty}
            setCartItems((prevItems)=>[...prevItems,newItems])
            toast.success("Cart Items added successfully")
        }
    }

    const increaseQty = () => {
        if(product.stock==qty || product.stock==0){
            toast.warning("Limited Stock!")
        }
        else{
            setQty((prevCnt) => prevCnt+1)
        }
    }

    const decreaseQty = () => {
        if(qty>1)
            setQty((prevCnt) => prevCnt-1)
    }

    return (
        // page will load only if the product contains data
        product && <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <img src={product.images[0].image} alt="sdf" height="400" width="400"/>
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product #{product._id}</p>
                <hr />

                <div className="rating-outer">
                    <div className="rating-inner" style={{width:`${product.ratings/5*100}%`}}></div>
                </div>
                <hr />

                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                    <input type="number" className="form-control count d-inline" value={qty} readOnly />

                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div>
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4"
                 onClick={addToCart} disabled={product.stock==0}>Add to Cart</button>

                <hr />

                <p>Status: <span id="stock_status" className={product.stock > 0 ? "text-success" :  "text-danger"}>
                    {product.stock > 0 ? "In Stock" : "Out Of Stock"}</span></p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
				
                <div className="rating w-50"></div>
						
            </div>

        </div>

    </div>
    )
}

export default ProductDetail