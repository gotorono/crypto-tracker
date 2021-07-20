import React from 'react'

import classnames from 'classnames';

function Overlay(props) {
    return (
        <div className={classnames("overlay", { active: props.active })}>
            {props.children}
        </div>
    )
}

export default Overlay
