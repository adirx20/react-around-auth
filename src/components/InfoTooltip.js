import React from 'react';
import PopupWithTip from './PopupWithTip';

// =====>
function InfoTooltip(props) {
    // JSX
    return (
        <PopupWithTip
        isOpen={props.isOpen}
        tipIcon={props.tipIcon}
        >

        </PopupWithTip>
    )
}
// <=====

export default InfoTooltip;