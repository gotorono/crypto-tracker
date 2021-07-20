import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import classnames from "classnames";

function Single(props) {
  const [removeActive, setRemoveActive] = useState(false);

  return (
    <div>
      <div className="info">
        <div className="name">{props.crypto.name}</div>
        <div className="symbol">{props.crypto.symbol}</div>
      </div>
      <div
        className={classnames("rightState", {
          added: props.added,
          remove: removeActive,
        })}
        onClick={
          removeActive
            ? () => {
                setRemoveActive(false);
                props.removeItemFromLocalStorage(props.crypto.symbol);
              }
            : () => props.addItemToLocalStorage(props.crypto.symbol)
        }
        onMouseOver={props.added ? () => setRemoveActive(true) : null}
        onMouseOut={props.added ? () => setRemoveActive(false) : null}
      >
        {props.added ? (
          removeActive ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faCheck} />
          )
        ) : (
          <FontAwesomeIcon icon={faPlus} />
        )}
      </div>
    </div>
  );
}

export default Single;
