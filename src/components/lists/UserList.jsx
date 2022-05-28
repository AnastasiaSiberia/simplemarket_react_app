import React from 'react';
import UserItem from "./listItems/UserItem";

const UserList = ({users, title}) => {
    if(users.length === 0) {
        return (
            <h1 style={{textAlign:'center'}}>
                No users!
            </h1>
        )
    }
    return (
        <div>
            <h1 style={{textAlign:"center"}}>{title}</h1>
                {users.map((user, index) =>
                        <UserItem number={index + 1} user={user} />
                )}
        </div>
    );
};

export default UserList;