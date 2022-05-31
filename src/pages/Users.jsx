import React, {useEffect, useState} from "react";
import UserList from "../components/lists/UserList";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
import Pagination from "../components/UI/pagination/Pagination";
import {getPageCount} from "../utils/utils";
import MyInput from "../components/UI/input/MyInput";
import {useUsers} from "../hooks/useUsers";
import ProductFilter from "../components/filters/ProductFilter";
import UserFilter from "../components/filters/UserFilter";

const Users = () => {
    const [allUsers, setAllUsers] = useState([])
    const [users, setUsers] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('')
    const searchedUsers = useUsers(allUsers, query)

    const [fetchAllUsers, isLoading, error] = useFetching(async () => {
        const response = await ProductService.getAllUsers()
        setAllUsers(response.data)
        setTotalPages(getPageCount(response.data.length, limit))
    })

    const updatePageContent = (page) => {
        let newUserList = []
        for(let i = limit * (page - 1); i < limit * page && i < searchedUsers.length; i++) {
            newUserList = [...newUserList, searchedUsers[i]]
        }
        setUsers(newUserList)
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    useEffect(() => {
        updatePageContent(page)
    }, [searchedUsers])

    const changePage = (page) => {
        setPage(page)
        updatePageContent(page)
    }

    return (
        <div>
            <div>
                <hr style={{margin: '15px 0'}}/>
                <UserFilter
                    query={query}
                    setQuery={setQuery}
                />
            </div>
            { error &&
                <h1>Error! ${error}</h1>
            }
            <UserList users={users} title={"Пользователи"}/>
            <Pagination page={page} totalPages={totalPages} changePage={changePage}/>
        </div>
    )
}

export default Users;