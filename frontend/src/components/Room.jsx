import React, { useEffect, useState} from 'react';
import { connect } from '../helpers/socket';

import User from './User'

export default function Room () {
  const [connection, setConnection] = useState(false)
  const [users, setUsers] = useState([])

  function onNewUser (newUser) {
    let userIndex = users.findIndex(user => user.id === newUser.id)
    if (userIndex >= 0) {
      setUsers([
        ...users.slice(0, userIndex),
        ...users.slice(userIndex, users.length)
      ])
    } else {
      setUsers([
        newUser
      ])
    }
  }


  async function connectAPI() {
    if (!connection) {
      console.log('Connection to Room')
      await connect('room1', onNewUser)
      console.log('Connected to Room')
      setConnection(true)
    }
  }

  useEffect(() => {
    connectAPI()
  })

  return (
    <div>
      {users.map(user => <User key={user.id} user={user} />)}
    </div>
  )
}