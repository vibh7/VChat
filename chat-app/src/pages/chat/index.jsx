import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import ChatContainer from './components/chat-container'
import ContactContainer from './components/contact-container'
import EmptyChatContainer from './components/empty-chat-container'

const Chat = () => {
  const {userInfo} = useAppStore()
  const navigate = useNavigate()
  useEffect(()=>{
    if(!(userInfo.profileSetup)){
      toast("Please setup the profile to continue")
      navigate("/profile")
    }
  },[userInfo,navigate])
  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ChatContainer /> 
      <ContactContainer />
      <EmptyChatContainer />
    </div>
  )
}

export default Chat
