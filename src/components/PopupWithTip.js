// =====>
function PopupWithTip(props) {
    return (

        <div className={`popup popup_type_tip ${props.isOpen ? 'popup_opened' : ''}`}>
            <figure className='popup__frame'>
                <button className='popup__close-button button-effect' type='button' aria-label='close' onClick={props.onClose}></button>
                <img
                    className='popup__image'
                    src={props.tipIcon}
                    alt={props.tipText}
                />
            </figure>
        </div>

    );
}
// <=====

export default PopupWithTip;