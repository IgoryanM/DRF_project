import React from 'react'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <>
            <h1>Users list</h1>
            <table>
                <th>
                    First name
                </th>
                <th>
                    Last Name
                </th>
                <th>
                    email
                </th>
                {users.map((user) => <UserItem user={user}/>)}
            </table>
        </>
    )
}


export default UserList
