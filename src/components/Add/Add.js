import React, { useState } from "react";
import "./Add.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@material-ui/core";

import Overlay from "./Overlay";
import CryptoList from "./CryptoList";
import { Scrollbars } from "react-custom-scrollbars";

function Add(props) {
  const [active, setActive] = useState(false);

  return (
    <div className="addWrapper">
      <Overlay active={active}>
        <div className="addCryptoListWrapper">
          <div className="closeButton">
            <IconButton onClick={() => setActive(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </div>
          <div style={{ width: "80%", height: "100%", margin: "0 auto" }}>
            <Scrollbars
            renderTrackVertical={({ style, ...props }) =>
                <div {...props} style={{ ...style, top: 20, bottom: 20, right: 2, borderRadius: 16 }}/>
            }
            >
              <CryptoList fetchCryptos={props.fetchCryptos} />
            </Scrollbars>
          </div>
        </div>
      </Overlay>
      <div className="showAddWrapper">
        <div className="text"> Add more cryptocurrencies</div>
        <IconButton onClick={() => setActive(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </div>
    </div>
  );
}

export default Add;
