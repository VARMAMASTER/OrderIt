import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search=()=> {
    const [keyword,setKeyword] = useState("");
    const navigate = useNavigate();
    const SearchHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/eats/stores/search/${keyword}`);
        }
    }
  return (
    
    <form onSubmit={SearchHandler}>
    <div className="input-group">
      <input
        type="text"
        id="search_field"
        className="form-control"
        placeholder="Search your Favorate Restaurant...."
        onChange = {(e)=>setKeyword(e.target.value)}
      />
      <div className="input-group-append">
        <button id="search_btn" className="btn">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </form>
  )
}


export default Search;
