import React, { useState } from 'react'
import victory from '@/assets/victory.svg'
import loginBg from '@/assets/login2.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { LOGIN_ROUTES, SIGNUP_ROUTES } from '@/utils/Constant'
import { useAppStore } from '@/store'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassowrd,setConfirmPassword] = useState("")
  const {setUserInfo} = useAppStore()
  const navigate = useNavigate()

  const validateLogin = () => {
    if(!email.length){
      toast.error('Email is required')
      return false
    }
    if(!password.length){
      toast.error('password is required')
      return false
    }
    return true
  }

  const validateSignUp = () => {
    if(!email.length){
      toast.error('Email is required')
      return false
    }
    if(!password.length){
      toast.error('password is required')
      return false
    }
    if(password != confirmPassowrd){
      toast.error('password and confirm password does not match')
      return false
    }
    return true
  }
  const handleLogin = async () =>{
    if(validateLogin()){
      const response = await apiClient.post(LOGIN_ROUTES,
        {email , password},
        {withCredentials : true}
      )
      console.log(response)
      if(response.data.id){
        setUserInfo(response.data.user)
        if(response.data.profileSetup) navigate("/chat")
        else navigate("/profile")
      }
    }
  }
  const handleSignup = async () =>{
    if(validateSignUp()){
      const response = await apiClient.post(SIGNUP_ROUTES,
        {email,password},
        {withCredentials : true}
      )
      if(response.status===201){
        setUserInfo(response.data.user)
        navigate("/profile")
      }
      console.log(response)
    }
  }


  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
        <div className='h-[90vh] bg-white border-2 border-white text-opacity-90 w-[80vw] shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>
            <div className='flex items-center justify-center gap-5  flex-col'>
                <div className='flex items-center justify-center flex-col'>
                    <div className='flex items-center justify-center '>
                    <h1 className='text-5xl md:text-6xl font-bold'>Welcome</h1>
                    <img src={victory} alt="victory image" className='h-[100px]' />
                    </div>
                    <p className='font-medium text-center'>Fill in detail to get started with best chat app</p>
                    </div>
                    <div className='flex items-center justify-center w-full'>
                      <Tabs className='w-3/4' defaultValue='login'>
                        <TabsList className="bg-transparent rounded-none w-full">
                          <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 w-full rounded-none data-[state=active]:font-semibold data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Login</TabsTrigger>
                          <TabsTrigger value="signup"
                          className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 w-full rounded-none data-[state=active]:font-semibold data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Signup</TabsTrigger>
                        </TabsList>
                        <TabsContent className="flex flex-col mt-10 gap-5" value="login">
                          <Input placeholder = "Email" type="email" className="rounded-full p-6"
                          value={email}
                          onChange = {(e)=>setEmail(e.target.value)}/>
                          <Input placeholder = "Password" type="password" className="rounded-full p-6"
                          value={password}
                          onChange = {(e)=>setPassword(e.target.value)}/>
                          <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
                        </TabsContent>
                        <TabsContent className="flex flex-col gap-3" value="signup">
                        <Input placeholder = "Email" type="email" className="rounded-full p-6"
                        value={email}
                        onChange = {(e)=>setEmail(e.target.value)}/>
                        <Input placeholder = "Password" type="password" className="rounded-full p-6"
                        value={password}
                        onChange = {(e)=>setPassword(e.target.value)}/>
                        <Input placeholder = "Confirm password" type="password" className="rounded-full p-6"
                        value={confirmPassowrd}
                        onChange = {(e)=>setConfirmPassword(e.target.value)}/>
                        <Button className="rounded-full p-6 my-3" onClick = {handleSignup}>Sign up</Button>
                        </TabsContent>
                      </Tabs>
                    </div>
                    </div>
                    </div>
                    <div className='hidden md:flex justify-center items-center'>
                      <img src={loginBg} alt='Login Background' className='h-[500px]'/>
                    </div>
    </div>
  )
}

export default Auth
