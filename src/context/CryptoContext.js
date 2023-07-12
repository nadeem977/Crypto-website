import { createContext, useLayoutEffect, useState } from "react";
import axios from 'axios';

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {

  const [cryptodata, setCryptoData] = useState();
  const [searchData, setSearch] = useState('');
  const [coinsid ,setCpinid] = useState("")
  const [currency ,setCurrncy] = useState("usd") 
  const [sort ,setSrorting] = useState("market_cap_desc");
  const [pages ,setPages] = useState(1)
  const [Totelnuber ,setTotelnuber] = useState(250)
  const [parpage ,setParpages] = useState(10)
  const[coindata ,setCoindata] = useState(null)
  const[coinsID ,setCoinsID] = useState(null)
  const [localsave , setLocalsave] = useState(null)
  const[errors ,setErrors] = useState([])


  
  const getcoinsdata = async() =>{
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinsID}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`);
    const data = response;
    setCoindata(data.data)

  } catch (error) {
    // console.log(error, 'the error message');
  }
 } 

  const getapidata = async () => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinsid}&order=${sort}&per_page=${parpage}&page=${pages}&sparkline=false&price_change_percentage=1h%2C24h%2C7dlocale=en`);
      const data = response.data;
      setCryptoData(data);
    } catch (error) {
      setErrors(error.message)
      console.log(error, 'the error message on product API');
    }
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/list");
        const data = response.data;
        setTotelnuber(data.length)
      } catch (error) {
        // console.log(error, 'the error message length API');
      }
  };

  const getsearchData = async (query) => {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
      const data = response.data;
      setSearch(data.coins);
    } catch (error) {
      setErrors(error.message)
      // console.log(error, 'the error message on Search API');
    }
  };

  useLayoutEffect(() => {
    getapidata()
    getcoinsdata()
  },[coinsid,currency,sort,pages,parpage,coinsID]);

  const resetfunction = ()=>{
    setPages(1)
    setParpages(10)
    setSearch("")
  }


  return (
    <CryptoContext.Provider
      value={{
        cryptodata,
        searchData,
        getsearchData,
        setCpinid,
        setCurrncy,
        currency,
        setSrorting,
        pages,
        setPages,
        Totelnuber,
        resetfunction,
        setParpages,
        parpage,
        coindata,
        setCoinsID,
        localsave ,
        setLocalsave,
        errors
      }}>
      {children}
    </CryptoContext.Provider>
  );
};
