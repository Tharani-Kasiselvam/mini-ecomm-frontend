import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProdSearch = () => {

    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate()

    const searchHandler = () => {
        navigate('/search?keyword='+keyword)
    }

    return (
        <div className="input-group">
        <input type="text" id="search_fld" className="form-control"
            placeholder="Enter Product Name ..." 
            onChange={(e)=>setKeyword(e.target.value)}
            onBlur={searchHandler}/>
        <div className="input-group-append">
            <button id="search_btn" className="btn"
            onClick={searchHandler}>
                <FaSearch />
            </button>
        </div>
    </div>
    )
}

export default ProdSearch