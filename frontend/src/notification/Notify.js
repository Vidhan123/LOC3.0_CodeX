import React from 'react';
import addNotification from 'react-push-notification';
 
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
      <div className="page">
          <button onClick={buttonClick} className="button">
           Notify
          </button>
      </div>
    )
}
 
export default Notify;