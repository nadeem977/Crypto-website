import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import Models from "../components/Models";

const Tranding = () => {
  const { setCoinsID } = useContext(CryptoContext);
  const [trandings, setTrandings] = useState(null);
  const [coinid, setCoinid] = useState(null);
  const getidfunc = (id) => {
    if (coinid !== id) {
      setCoinsID(id);
      setCoinid(id);
    }
  };

  useEffect(() => {
    const TrandingFunc = async () => {
      try {
        const data = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        const result = data.data;
        setTrandings(result.coins);
      } catch (error) {
        // console.log(error, "Tranding throw the error");
      }
    };
    TrandingFunc();
  }, []);

  return (
    <>
      <div className="trandings-coins">
        {trandings ? (
          trandings.map((coin, index) => (
            <div
              key={index}
              className="trandings cursor-pointer hover:bg-cyan hover:bg-opacity-25"
              onClick={() => getidfunc(coin.item.id)}
            >
              <div className="main-div-tran">
                <h3 className="text-gray-100">
                  Name{" "}
                  <span className="text-cyan text-md font-bold">
                    {coin.item.name}
                  </span>
                </h3>
                <h3 className="text-gray-100">
                  Market Cap Rank{" "}
                  <span className="text-cyan text-md font-bold">
                    {coin.item.market_cap_rank}
                  </span>
                </h3>
                <h3 className="text-gray-100">
                  Price{" "}
                  <span className="text-cyan text-md font-bold">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "btc",
                      maximumSignificantDigits: 5,
                    }).format(coin.item.price_btc)}
                  </span>
                </h3>
                <h3 className="text-gray-100">
                  Score:{" "}
                  <span className="text-cyan text-md font-bold">
                    {coin.item.score}
                  </span>
                </h3>
              </div>
              <img src={coin.item.large} alt={coin.item.small} />
            </div>
          ))
        ) : (
          <div className="w-full h-full min-h-[60vh] flex justify-center items-center ">
            <div
              className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
              role="status"
            />
            <span className="ml-2">Loading...</span>
          </div>
        )}
        <Models id={coinid} />
      </div>
    </>
  );
};

export default Tranding;
