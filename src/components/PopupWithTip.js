import { useNavigate } from 'react-router-dom';

// =====>
function PopupWithTip({ isOpen, ...props }) {
    // Navigation
    const navigate = useNavigate();

    // Handlers
    function closeTip() {
        props.onClose();
        navigate('/signin');
    }

    // JSX
    return (
        <div className={`popup popup_type_tip ${isOpen ? 'popup_opened' : ''}`}>
            <figure className='popup__frame'>
                <div className='popup__tip-container'>
                    <button className='popup__close-button button-effect' type='button' aria-label='close' onClick={closeTip}></button>
                    <img
                        className='popup__tip-icon'
                        src={props.tipIcon}
                        alt={props.tipText}
                    />
                    <p className='popup__tip-text'>{props.tipText}</p>
                </div>
            </figure>
        </div>

    );
}
// <=====

export default PopupWithTip;