import React from 'react';
import UserItem from "./listItems/UserItem";

const UserList = ({users, title}) => {
    return (
        <div>
            <h1 style={{textAlign:"center", marginTop: "30px"}}>{title}</h1>
                {users.map((user, index) =>
                        <UserItem number={index + 1} user={user} />
                )}
        </div>
    );
};

export default UserList;