import React from 'react';
import UserListItem from '../userListItem/index';
import classes from './UserList.module.css';

const confirmed_users = [
  { id: 1, name: 'Jane', surname: 'Smith', mobile_number: "0731111111", confirmed: true },
  { id: 2, name: 'Alice', surname: 'Williams', mobile_number: "0731111111", confirmed: true },
];

const users = [
  { id: 1, name: 'John', surname: 'Doe', mobile_number: "0731111111", confirmed: false },
  { id: 2, name: 'Bob', surname: 'Johnson', mobile_number: "0731111111", confirmed: false },
];

const UserList = (props) => {
  return (
    <>
    <ul className={classes["user-list"]}>
      {confirmed_users.map(user => (
        <UserListItem key={user.id} name={user.name} surname={user.surname} mobile_number={user.mobile_number} confirmed={user.confirmed} acceptClick={props.acceptClick} denyClick={props.denyClick}/>
      ))}
    </ul>
    
    <ul className={classes["user-list"]}>
      {users.map(user => (
        <UserListItem key={user.id} name={user.name} surname={user.surname} mobile_number={user.mobile_number} confirmed={user.confirmed} acceptClick={props.acceptClick} denyClick={props.denyClick}/>
      ))}
    </ul>
    </>
  );
};

export default UserList;