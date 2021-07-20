import React, { useState, useEffect } from "react";

import Single from "./Single";

const cryptoList = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "DOGE", name: "Dogecoin" },
  { symbol: "LTC", name: "Litecoin" },
  { symbol: "BNB", name: "Binance Coin" },
  { symbol: "ADA", name: "Cardano" },
  { symbol: "FIL", name: "Filecoin" },
];

function CryptoList(props) {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    getMyList();
  }, []);

  const getMyList = () => {
    if (localStorage.getItem("cryptos"))
      setMyList(JSON.parse(localStorage.getItem("cryptos")));
    else 
      setMyList(["BTC", "ETH"])
  };

  const addItemToLocalStorage = (item) => {
    let saved = localStorage.getItem("cryptos")
      ? JSON.parse(localStorage.getItem("cryptos"))
      : ["BTC", "ETH"];

    if (!saved.includes(item)) {
      saved.push(item);
      localStorage.setItem("cryptos", JSON.stringify(saved));
      getMyList();
      props.fetchCryptos();
    }
  };

  const removeItemFromLocalStorage = (item) => {
    let saved = localStorage.getItem("cryptos")
      ? JSON.parse(localStorage.getItem("cryptos"))
      : ["BTC", "ETH"];

    if (saved.includes(item)) {
      saved = saved.filter((i) => i !== item);
      localStorage.setItem("cryptos", JSON.stringify(saved));
      getMyList();
      props.fetchCryptos();
    }
  };

  return (
    <div className="addCryptoList">
      {cryptoList.map((crypto, i) => (
        <Single
          key={i}
          removeItemFromLocalStorage={removeItemFromLocalStorage}
          addItemToLocalStorage={addItemToLocalStorage}
          crypto={crypto}
          added={myList.includes(crypto.symbol)}
        />
      ))}
    </div>
  );
}

export default CryptoList;
