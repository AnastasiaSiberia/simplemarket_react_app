import React from 'react';
import MyButton from "../UI/button/MyButton";

const ConfirmForm = ({foo, message}) => {
    return (
        <form>
            <strong>{message}</strong>
            <div>
                <MyButton onClick={foo}>Да</MyButton>
                <MyButton>Нет</MyButton>
            </div>
        </form>
    );
};

export default ConfirmForm;