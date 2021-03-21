import React from 'react';
import addNotification from 'react-push-notification';
import CustomButton from "components/CustomButtons/Button.js";
 
// import Notify from "../../notification/Notify";
// <Notify msg="Hello" />

function Notify(props) {
 
    const buttonClick = () => {
        addNotification({
            title: 'Notification from Clinic CodeX',
            subtitle: '',
            message: props.msg,
            theme: 'darkblue',
            native: true // when using native, your OS will handle theming.
        });
    };
 
    return (
        <CustomButton variant="contained" color="warning" onClick={buttonClick}>
            Submit
        </CustomButton>
    //   <div className="page">
    //       <button onClick={buttonClick} className="button">
    //        Notify
    //       </button>
    //   </div>
    )
}
 
export default Notify;