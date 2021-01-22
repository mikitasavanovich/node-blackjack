import React, { useEffect, useState } from 'react'
import * as ApiService from '../../services/ApiService'
import { IUserInfo } from '../../interfaces'
import './Profile.css'

interface IProfileProps {
  children: React.ReactNode
}

function Profile (props: IProfileProps) {
  const [userInfo, setUserInfo] = useState<IUserInfo>()

  const fetchUserInfo = async () => {
    const userInfo = await ApiService.getUserInfo()
    setUserInfo(userInfo)
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

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
      {props.children}
    </div>
  )
}

export default Profile

export const withProfile = (Component: () => JSX.Element) => () => (
  <Profile>
    <Component />
  </Profile>
)