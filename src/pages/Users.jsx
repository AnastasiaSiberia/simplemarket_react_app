import React, {useEffect, useState} from "react";
import UserList from "../components/lists/UserList";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
const Users = () => {
    const [users, setUsers] = useState([])
    const [fetchUsers, isLoading, error] = useFetching(async () => {
        const response = await ProductService.getAllUsers()
        setUsers(response.data)
    })
    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <UserList users={users} title={"Пользователи"}/>
    )
}

export default Users;