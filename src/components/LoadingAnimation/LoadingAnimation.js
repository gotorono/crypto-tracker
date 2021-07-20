import React from 'react'
import './LoadingAnimation.scss';

import classnames from 'classnames';

function LoadingAnimation({ loading }) {
    return (
        <div className={classnames("loadingAnimation", { loading })}>
            <div className="stripes">
                <div />
            </div>
        </div>
    )
}

export default LoadingAnimation
