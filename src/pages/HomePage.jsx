import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { useSearchParams } from "react-router-dom"

const HomePage = () => {
    const [products,setProducts] = useState([])
    const [searchParam,setSearchParam] = useSearchParams()

    useEffect(()=>{
        fetch(import.meta.env.VITE_BASE_URL+'/products?'+searchParam)
        .then(res => res.json())
        .then(resData => setProducts(resData.products))
        .catch(error=>{
            console.log('Error fetching API data',error)
        })
    },[searchParam])

    let prodkey = 0

    return (
        <div>
            <h1 id="products_heading" style = {{textAlign:"center"}}>Welcome to Easy Products Portal !!!</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                        {products.map(product => <ProductCard product = {product} key = {prodkey++}/>)}
                    </div>
            </section>
        </div>
    )
}

export default HomePage