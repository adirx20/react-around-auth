import React from 'react';
import PopupWithTip from './PopupWithTip';

// =====>
function InfoToolTip({ tipStatus, ...props }) {
    // JSX
    return (
        <>
            <PopupWithTip // Success tip
                onClose={props.onClose}
                isOpen={props.isOpen}
                tipIcon={
                    tipStatus
                    ? props.successTipIcon
                    : props.failedTipIcon                    
                }
                tipText={
                    tipStatus
                    ? 'Success! You have now been registered.'
                    : 'Oops, something went wrong! Please try again.'
                }
            />
        </>
    )
}
// <=====

export default InfoToolTip;