import React, { useContext } from 'react'
import './Profile.css'
import { UserContext } from '../../context/User'

function Profile () {
  const { userInfo } = useContext(UserContext)

  return (
    <div className='profile'>
      <div className='profile__header'>
        {userInfo && (
          <>
            <div className='profile__id'>{userInfo.id}</div>
            <div className='profile__name'>{userInfo.username}</div>
            <div className='profile__wallet'>{userInfo.wallet}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
