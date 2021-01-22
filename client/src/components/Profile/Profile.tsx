import React, { useEffect, useState } from 'react'
import * as ApiService from '../../services/ApiService'
import { IUserInfo } from '../../interfaces'
import './Profile.css'

interface IProfileProps {
  children: JSX.Element
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

  const child = React.cloneElement(props.children, { userInfo })

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
      {child}
    </div>
  )
}

export default Profile

export const withProfile = (Component: (props: any) => JSX.Element | null) => () => (
  <Profile>
    <Component />
  </Profile>
)