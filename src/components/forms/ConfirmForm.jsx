import React from 'react';
import MyButton from "../UI/button/MyButton";

const ConfirmForm = ({foo, message}) => {
    return (
        <form>
            <strong>{message}</strong>
            <MyButton onClick={foo}>Да</MyButton>
            <MyButton>Нет</MyButton>
        </form>
    );
};

export default ConfirmForm;