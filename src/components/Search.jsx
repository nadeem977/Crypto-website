import React, { useContext} from "react";
import searchicon from "../assets/search.svg";
import { CryptoContext } from "../context/CryptoContext";
import { debounce } from "lodash";

const SearchInputFunc = ({ debounceFunc }) => {
const [search, setSearch] = React.useState("");
const {searchData,setCpinid} = useContext(CryptoContext)

  const handelchange = (e) => {
    e.preventDefault();
    const qurey = e.target.value;
    setSearch(qurey);
    debounceFunc(qurey);
  };
  const setsubmitform = (e) =>{
   e.preventDefault()
   debounceFunc(search)
  }
  const getcoinsid =(coin) =>{
    setCpinid(coin)
    setSearch("")
  }

  return (
    <>
      <div className="w-full">
        <form className="w-96  form-input relative flex items-center ml-7 font-nunito"
        onSubmit={setsubmitform}
        >
          <input
            type="text"
            name="search"
            value={search}
            className="w-full input rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan"
            placeholder="search here... "
            onChange={handelchange}
          />
          <button type="submit" className="absolute right-1">
            <img src={searchicon} alt="" />
          </button>
        </form>


        {search  ? (

          <ul className="absolute top-11 right-0 w-96  h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md">

            {searchData.length > 0 ? 

              searchData.map((data, index) => {

              return(
              <div  key={index} className="flex items-center ml-4 my-2 cursor-pointer"
              onClick={() => getcoinsid(data.id)}
              >
                <img src={data.thumb} alt={data.name} className="w-[1rem] h-[1rem] mx-1.5" />
                 <p>{data.name}</p>
              </div>
                 )}) : (
              <div className="w-full h-full flex justify-center items-center "> <div className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"role="status"/> <span className="ml-2">Searching...</span>
            </div>
            )}


          </ul>
        ) : null}
      </div>
    </>
  );
};



const Search = () => {

  const {getsearchData} = useContext(CryptoContext)
  const debounceFunc = debounce(function(val){
  getsearchData(val)
  },2000)

  return (
    <div className="relative w-full">
    <SearchInputFunc debounceFunc={debounceFunc}/>
    </div>
  );
};
export default Search;
