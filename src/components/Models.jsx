import React ,{useState,useEffect, useContext} from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Chart from "./Chart";
import { CryptoContext } from '../context/CryptoContext';


const Highlowdata = ({currentprice ,low, high}) =>{

    const[green , setGreen] = useState()
    useEffect(()=>{
     const total = high - low;
     const greenZone =((high - currentprice)*100)/total;
     setGreen(Math.ceil(greenZone))
    },[currentprice ,low, high])
  
    return(
     <>
      <span className="bg-red h-1.5 rounded-l-lg w-[50%]" style={{width:`${100 - green}%`}}>&nbsp;</span>
      <span className="bg-green h-1.5 rounded-r-lg w-[50%]" style={{width:`${green}%`}}>&nbsp;</span>
     </>
    )
  } 


const Models = ({modalcoinID ,id}) => {

const {currency,coindata} = useContext(CryptoContext)
const [open, setOpen] = useState(false);
const handleClose = () => {
  setOpen(false);
};

useEffect(() => {
    if(modalcoinID || id){
        setOpen(true)
    }else{
        setOpen(false)
    }
  },[modalcoinID, id]);

  return (
    
    <>
      {coindata && coindata ? (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="fixed top-0 w-full h-full bg-gray-200 bg-opacity-30 first-letter:backdrop-blur-sm flex items-center justify-center font-nunito"
          >
            <Box
              id="modal-modal-title"
              component="div"
              className="w-[65%] models-div h-content bg-gray-300 bg-opacity-75 rounded-lg text-white relative"
            >
              <div className="chart-main-div flex items-center justify-between h-full p-4 w-full">
                <div className="firstchar-div flex flex-col w-[45%] h-full pr-2">
                  <div className="flex items-center justify-start gap-2">
                    <img
                      src={coindata.image.large}
                      alt={coindata.id}
                      className="w-[3rem] h-[3rem]mx-1.5 imgprice"
                    />
                    <h1 className="text-xl pricename capitalize font-medium">
                      {coindata.name}
                    </h1>
                    <span className="text-sm py-0.5 px-2.5 ml-2 bg-cyan text-cyan bg-opacity-25 rounded uppercase">
                      {coindata.symbol}
                    </span>
                  </div>

                  <div className="flex w-full mt-6 justify-between">
                    <span className="text-sm capitalize text-gray-100">
                      Price
                    </span>
                    <div
                      className={`text-sm px-1 ml-2 font-medium flex items-center rounded uppercase bg-opacity-25
                    ${
                      coindata.market_data.price_change_percentage_24h > 0
                        ? "text-green bg-green"
                        : "text-red bg-red"
                    }
                    `}
                    >
                      {Number(
                        coindata.market_data.price_change_percentage_24h
                      ).toFixed(2)}
                      %{" "}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`
                        w-[1rem] ml-0.5
                        ${
                          coindata.market_data.price_change_percentage_24h > 0
                            ? "fill-green rotate-180"
                            : "fill-red"
                        }
                        `}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold">
                    {" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: currency,
                    }).format(coindata.market_data.current_price[currency])}
                  </h2>
                  <div className="flex mrkit-flex justify-between items-center mt-2">
                    <div>
                      <span className="text-sm  capitalize text-gray-100">
                        Market Cap
                      </span>
                      <h2 className="text-base font-bold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: currency,
                        }).format(coindata.market_data.market_cap[currency])}
                      </h2>
                    </div>

                    <div>
                      <span className="text-sm  capitalize text-gray-100">
                        fully diluted valuation
                      </span>
                      <h2 className="text-base font-bold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: currency,
                        
                        }).format(
                          coindata.market_data.fully_diluted_valuation[currency]
                        )}
                      </h2>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm  capitalize text-gray-100">
                      total volume
                    </span>
                    <h2 className="text-base font-bold">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: currency,
                        notation: "compact",
                      }).format(coindata.market_data.total_volume[currency])}
                    </h2>
                  </div>

                  <div className="flex w-full mt-4 justify-between">
                  <Highlowdata 
                  currentprice={coindata.market_data.current_price[currency]}
                  low={coindata.market_data.low_24h[currency]}
                  high={coindata.market_data.high_24h[currency]}
                  
                  />
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <span className="text-sm  capitalize text-gray-100">
                        Low 24H
                      </span>
                      <h2 className="text-base font-bold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: currency,
                        }).format(coindata.market_data.low_24h[currency])}
                      </h2>
                    </div>

                    <div>
                      <span className="text-sm  capitalize text-gray-100">
                        high 24H
                      </span>
                      <h2 className="text-base font-bold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: currency,
                        }).format(coindata.market_data.high_24h[currency])}
                      </h2>
                    </div>
                  </div>
                  <div className="flex mrkit-flex justify-between items-center mt-2">
                    <div>
                      <span className="text-sm  capitalize text-gray-100">
                        Max Supply
                      </span>
                      <h2 className="text-base font-bold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: currency,
                          minimumFractionDigits: 5,
                        }).format(coindata.market_data.max_supply)}
                      </h2>
                    </div>

                    <div>
                      <span className="text-sm  capitalize text-gray-100">
                        Circulating Supply
                      </span>
                      <h2 className="text-base font-bold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: currency,
                          minimumFractionDigits: 0,
                        }).format(coindata.market_data.circulating_supply)}
                      </h2>
                    </div>
                  </div>
                  <div className="flex mrkit-flex items-center justify-between mt-4">
                   <div className="flex flex-col gap-1">
                   <a className="text-sm bg-gray-200 text-gray-100 p-1 m-1 rounded" rel="noreferrer"  href={coindata?.links?.homepage[0]} target="_blank">{coindata?.links?.homepage[0].substring(0,30)}</a>
                   <a className="text-sm bg-gray-200 text-gray-100 p-1 m-1 rounded" rel="noreferrer" href={coindata?.links?.blockchain_site[0]} target="_blank">{coindata?.links?.blockchain_site[0].substring(0,30)}</a> 
                    {coindata?.links?.official_forum_url[0] &&  <a className="text-sm bg-gray-200 text-gray-100 p-1 m-1 rounded" rel="noreferrer" href={coindata?.links?.official_forum_url[0]} target="_blank">{coindata.links?.official_forum_url[0].substring(0,30)}</a>}
                   </div>
                    <div className="flex flex-col content-start gap-2">
                      <span className="text-sm text-gray-100 ml-2">sentiment </span>
                      <div
                        className={`text-sm px-1 ml-2 font-medium flex items-center rounded uppercase bg-opacity-25 text-green bg-green`}
                      >
                        {Number(
                          coindata.sentiment_votes_up_percentage
                        ).toFixed(2)}
                        %{" "}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`
                          fill-green rotate-180
                        w-[1rem] ml-0.5 `}>
                          <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                        </svg>
                      </div>

                      <div
                        className={`text-sm px-1 ml-2 font-medium flex items-center rounded uppercase bg-opacity-25 text-red bg-red`}>
                        {Number(
                          coindata.sentiment_votes_down_percentage
                        ).toFixed(2)}
                        %{" "}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`
                        w-[1rem] ml-0.5 fill-red`}>
                          <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex secondchart-div flex-col w-[55%] h-full pl-3">
                 <Chart id={coindata.id}/>
                 <div className="btn-wrp flex items-center gap-2 mt-2">
                  <h2 className="text-sm bg-gray-200 text-gray-100 p-1 rounded">Coingecko Rank: <span className="text-cyan">{coindata.coingecko_rank}</span></h2>
                  <h2 className="text-sm bg-gray-200 text-gray-100 p-1 rounded">Coingecko Score: <span className="text-cyan">{coindata.coingecko_score}</span></h2>
                  <h2 className="text-sm bg-gray-200 text-gray-100 p-1 rounded">Market Cap Rank: <span className="text-cyan">{coindata.market_cap_rank}</span></h2>
                 </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      ) : null} 
    </>
  )
}

export default Models