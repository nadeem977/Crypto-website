import React,{useContext,useRef} from "react";
import Search from "./Search";
import submiticon from '../assets/submit-icon.svg'
import { CryptoContext } from "../context/CryptoContext";
import {BiReset} from 'react-icons/bi'
const Filter = () => {

 const {setCurrncy ,setSrorting,resetfunction} = useContext(CryptoContext);

 const currencyRef = useRef()
 const handelformdata = (e) =>{
   e.preventDefault()
   let val = currencyRef.current.value
   setCurrncy(val)
  currencyRef.current.value ="";
 }

 const handleSort = (e) =>{
   e.preventDefault()
   let val = e.target.value;
  setSrorting(val)
 }
 
  return (
    <div className="filterpage  h-12 border-2 border-gray-100 rounded-lg flex items-center justify-between relative">
      <div className="input-div">
        {" "}
        <Search />
      </div>
      <div className="btn-div flex mr-7">
        <form className="form-btns relative flex items-center font-nunito mr-12" onSubmit={handelformdata}>
          <label htmlFor="currency" className="relative flex justify-center items-center first-letter: mr-2 font-bold">currency: </label>
          <input type="text" name="currency" 
             placeholder="usd"
             ref={currencyRef}
             className="w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4 "/>
          <button type="submit" className="ml-1 cursor-pointer">
          <img src={submiticon} alt="submiticon" className="w-full h-auto" />
          </button>
        </form>

          <label className="labels relative flex justify-center items-center">
          <span className="font-bold mr-2">sort by: </span>
          <select
            name="sortby"
            className="rounded bg-gray-200 text-base pl-2 pr-10 py-0.5 leading-4 capitalize focus:outline-0"
            onClick={handleSort} >
            <option value="market_cap_desc">market cap desc</option>
            <option value="market_cap_asc">market cap asc</option>
            <option value="volume_desc">volume desc</option>
            <option value="volume_asc">volume asc</option>
            <option value="id_desc">id desc</option>
            <option value="id_asc">id asc</option>
            <option value="gecko_desc">gecko desc</option>
            <option value="gecko_asc">gecko asc</option>
          </select>
        <button   className="w-[2rem] ml-4 hover:scale-110 transition-all transition-ease
        relative reset-btn
        " onClick={resetfunction}><BiReset style={{color:'#14ffec',fontSize:'25px'}}/></button>
        </label>
      </div>
    </div>
  );
};

export default Filter;
