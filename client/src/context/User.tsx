import React, { useState, useEffect } from 'react'
import * as ApiService from '../services/ApiService'
import { IUserContext, IUserInfo } from '../interfaces'

export const UserContext = React.createContext<Partial<IUserContext>>({})

function UserContextProvider (props: { token: string | null, children: JSX.Element[] }) {
  const [userInfo, setUserInfo] = useState<IUserInfo>()

  const fetchUserInfo = async () => {
    const userInfo = await ApiService.getUserInfo()
    setUserInfo(userInfo)
  }

  useEffect(() => {
    if (props.token) {
      fetchUserInfo()
    }
  }, [props.token])

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider