import React, { useEffect, useState, useRef } from "react";
import "./Cryptocurrency.scss";

import HourChange from "./HourChange";

import classnames from "classnames";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

function Cryptocurrency(props) {
  const [currency, setCurrency] = useState({});

  const cryptoRef = useRef();

  useEffect(() => {
    if (props.currency) setCurrency(props.currency);
  }, [props.currency]);

  const handleTranslate = ({ x, y }) => {
    x = x - cryptoRef.current.offsetLeft - cryptoRef.current.clientWidth / 2;
    y = y - cryptoRef.current.offsetTop - cryptoRef.current.clientHeight / 2;

    return `translate(${x}px, ${y}px)`;
  };

  const moveToPosition = (move) => {
    return move === 1 ? 180 : move === -1 ? -180 : 0;
  };

  return (
    <div
      style={{ position: "relative" }}
      className={classnames(
        "cryptocurrencyWrapper",
        props.dragging ? "dragged" : ""
      )}
      ref={cryptoRef}
    >
      <div
        className="dragging cryptocurrency"
        style={{
          position: "absolute",
          top: "-30px",
          boxShadow: "unset",
          opacity: 0.5,
          left: 0,
          zIndex: -1,
          backgroundColor: "black",
        }}
      />
      <div
        className="cryptocurrency"
        onMouseDown={() => props.onDrag(cryptoRef.current, props.index)}
        onTouchStart={() => props.onDrag(cryptoRef.current, props.index)}
        style={
          props.dragging
            ? {
                zIndex: 10,
                userSelect: "none",
                transform: handleTranslate(props.dragging),
              }
            : props.move
            ? {
                transform: `translateY(${moveToPosition(props.move)}px)`,
              }
            : null
        }
      >
        <LoadingAnimation loading={props.loading} />
        {props.loading ? null : (
          <div>
            <div className="info">
              <div className="name">{currency.name}</div>
              <div className="symbol">{currency.symbol}</div>
            </div>
            <div className="priceWrapper">
              <HourChange change={currency.quote?.CZK?.percent_change_24h}>
                <div className="up">
                  <HourChange.Up>
                    <div className="downSymbol" />
                  </HourChange.Up>
                  <HourChange.Down>
                    <div className="upSymbol" />
                  </HourChange.Down>
                  <div>24 h</div>
                </div>
                <div className="down">
                  {currency.quote?.CZK?.percent_change_24h.toFixed(2)} %
                </div>
              </HourChange>
              <div className="czk">
                {new Intl.NumberFormat("cs-CZ", {
                  style: "currency",
                  currency: "CZK",
                }).format(currency?.quote?.CZK?.price.toFixed(2))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cryptocurrency;
