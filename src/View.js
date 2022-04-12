import React from 'react'

export default function View({username,password,city,server,role,services}) {
  return (

    <ul title={`${username} Details`}>
        <li>{username}</li>
        <li>{password}</li>
        <li>{city}</li>
        <li>{server}</li>
        <li>{role}</li>
        <li>{services}</li>
    </ul>
  )
}
