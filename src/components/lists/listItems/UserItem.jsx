import React, {useState} from 'react';
import ProductService from "../../../API/ProductService";
import MySelect from "../../UI/select/MySelect";
import MyModal from "../../UI/modal/MyModal";
import ConfirmForm from "../../UI/ConfirmForm";

const UserItem = (props) => {
    const [modal, setModal] = useState(false)
    const [role, setRole] = useState(props.user.user_role)
    const confirmMessage = 'Вы действительно хотите сменить роль ' + props.user.username + ' на ' + role + '?'
    const callConfirmForm = (selected) => {
        if(selected !== props.user.user_role) {
            setRole(selected)
            setModal(true)
        }
    }

    const changeRole = async() => {
        const response = await ProductService.changeRole(props.user.user_id, role)
    }

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.user.username}</strong>
                <div>
                    <MyModal visible={modal} setVisible={setModal}>
                        <ConfirmForm message={confirmMessage}  foo={changeRole()} />
                    </MyModal>
                    <MySelect
                        defaultValue={props.user.user_role}
                        value={role}
                        onChange={selected => callConfirmForm(selected)}
                        options={[
                            {value: 'USER', name: 'USER'},
                            {value: 'ADMIN', name: 'ADMIN'},
                            {value: 'VENDOR', name: 'VENDOR'}
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserItem;