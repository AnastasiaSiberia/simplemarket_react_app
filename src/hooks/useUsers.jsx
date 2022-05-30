import {useMemo} from "react";

export const useUsers = (users, query) => {
    const lowerQuery = query.toLowerCase()
    return useMemo(() => {
            return users.filter((user) => user.username.toLowerCase().includes(lowerQuery)
                || user.user_email.toLowerCase().includes(lowerQuery)
            )
        },
        [query, users]
    )
}