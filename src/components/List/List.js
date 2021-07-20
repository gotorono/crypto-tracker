import React, { useEffect, useState, useCallback, useRef } from "react";
import "./List.scss";

import Cryptocurrency from "../Cryptocurrency/Cryptocurrency";
import axios from "../../functionality/axios";

const useMousePosition = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMovement = (e) => {
    e.stopPropagation()
    e.preventDefault();

    if (e.targetTouches) 
      setPos({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
    else setPos({ x: e.clientX, y: e.clientY });
  };

  const touchStartHandler = (e) => {
    setPos({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY })
  }

  useEffect(() => {
    document.addEventListener("touchstart", touchStartHandler);
    document.addEventListener("touchmove", handleMovement);
    window.addEventListener("mousemove", handleMovement);

    return () => {
      document.removeEventListener("touchstart", touchStartHandler);
      document.removeEventListener("touchmove", handleMovement);
      window.removeEventListener("mousemove", handleMovement);
    };
  }, []);

  return pos;
};

function List(props) {
  const [currencies, setCurrencies] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [tempMove, setTempMove] = useState(null);

  const listRef = useRef();
  const { x, y } = useMousePosition();

  const changeCryptosLocalStorage = (array) => {
    localStorage.setItem("cryptos", JSON.stringify(array));
  };

  const fetchCrypto = async () => {
    const myList = localStorage.getItem("cryptos")
      ? JSON.parse(localStorage.getItem("cryptos"))
      : null;

    const req = await axios.get("/eurosouvenir/users/crypto/details", {
      params: {
        symbols: myList ? myList : ["BTC", "ETH"],
      },
    });

    let cryptoArray = Object.keys(req.data).map((key, i) => {
      return req.data[key];
    });

    console.log(cryptoArray);

    let cryptoArraySorted = myList?.map((crypto, i) => {
      return cryptoArray.find((curr) => curr.symbol === crypto);
    });

    setCurrencies(
      myList && myList.length > 0 ? cryptoArraySorted : cryptoArray
    );
  }

  const getMove = useCallback(
    (i) => {
      if (tempMove !== null && tempMove !== dragging?.index) {
        if (tempMove === i) return dragging?.index < tempMove ? -1 : 1;
        else if (i <= tempMove && dragging?.index <= i) return -1;
        else if (i >= tempMove && dragging?.index >= i) return 1;
        else return 0;
      } else return 0;
    },
    [tempMove, dragging]
  );

  useEffect(() => {
    if (dragging?.index !== undefined) {
      let currPos = Math.floor(y / 180);
      if (tempMove !== currPos) setTempMove(currPos);
    }
  }, [dragging, y, tempMove, getMove]);

  const mouseUpHandler = useCallback(() => {
    let movesPossible = new Array(currencies?.length).fill(1);
    movesPossible.forEach((e, i) => {
      movesPossible[i] = i;
    });

    if (dragging !== null) {
      if (movesPossible.includes(tempMove)) {
        let newCurrencies = new Array(currencies.length - 1);

        newCurrencies[tempMove] = currencies[dragging.index];

        for (let i = 0; i < currencies.length; i++) {
          if (i !== dragging.index) {
            newCurrencies[i + getMove(i)] = currencies[i];
          }
        }

        listRef.current.classList.add("no-transition");
        setDragging(null);
        setTempMove(null);
        setCurrencies(newCurrencies);
        changeCryptosLocalStorage(
          newCurrencies.map((curr) => {
            return curr.symbol;
          })
        );
        setTimeout(() => {
          listRef.current.classList.remove("no-transition");
        }, 250);
      } else {
        setDragging(null);
        setTempMove(null);
      }
    }
  }, [currencies, getMove, dragging, tempMove]);

  useEffect(() => {
    fetchCrypto()
  }, [props.fetchCryptos]);

  useEffect(() => {
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("touchend", mouseUpHandler);

    return () => {
      window.removeEventListener("touchend", mouseUpHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [mouseUpHandler]);

  return (
    <div className="cryptoList" ref={listRef}>
      {currencies ? (
        currencies.map((curr, i) => (
          <Cryptocurrency
            move={dragging?.index === i ? null : getMove(i)}
            dragging={dragging?.index === i ? { x, y } : false}
            onDrag={(ref, index) => setDragging({ index, ref })}
            index={i}
            key={i}
            currency={curr}
            loading={currencies ? false : true}
          />
        ))
      ) : (
        <Cryptocurrency onDrag={() => null} loading={true} />
      )}
    </div>
  );
}

export default List;
