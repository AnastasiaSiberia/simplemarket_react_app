import React from 'react';
import classes from './MyButton.module.css';
const TransparentButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.transparentButton}>
            {children}
        </button>
    );
};

export default TransparentButton;