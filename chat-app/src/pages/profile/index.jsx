import { useAppStore } from '@/store'
import React from 'react'

const Profile = () => {
  const {userInfo} = useAppStore()
  return (
    <div>
      profile
      <div>Email : {userInfo.email}</div>
    </div>
  )
}

export default Profile
