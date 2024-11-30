
import { Link } from 'react-router-dom';
import '../App.css'
import ProdSearch from './ProdSearch';

const Header = ({cartItems}) => {

    return (
        <header>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                        <img width="70px" src="./easy_logo.png" style={{marginLeft:"50px"}}/>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <ProdSearch />
                </div>
                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart">
                        <span id="cart">Cart</span>
                        <span id="cart_count">{cartItems.length}</span>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header