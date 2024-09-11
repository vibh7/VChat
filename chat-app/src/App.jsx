import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,BrowserRouter,Routes, Navigate } from 'react-router-dom'
import { GET_USER_INFO } from '@/utils/Constant'
import Auth from './pages/auth'
import Profile from './pages/profile'
import Chat from './pages/chat'
import { useAppStore } from './store'
import apiClient from './lib/api-client'

const privateRoute = ({children}) => {
  const {userInfo} = useAppStore()
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth"/>;
}

const AuthRoute = ({children}) => {
  const {userInfo} = useAppStore()
  const isAuthenticated = !!userInfo;
  return isAuthenticated ?  <Navigate to="/chat"/> : children;
}

function App() {
  const {userInfo,setUserInfo} = useAppStore();
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const getUserDate = async () =>{
      try {
        const res = await apiClient.get(GET_USER_INFO,{
          withCredentials:true
        })
        if(res.status == 200 && res.data.id){
          setUserInfo(res.data)
        }
        else{
          setUserInfo(undefined)
        }
        console.log(res)
      } catch(err) {
        setUserInfo(undefined)
      }
      finally {
        setLoading(false)
      }
    }
    if(!userInfo){
      getUserDate()
    }
    else{
      setLoading(false)
    }
  },[userInfo,setUserInfo])

  if(loading){
    return <div>Loading...</div>
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={
          <AuthRoute>
          <Auth />
          </AuthRoute>
        } />
        <Route path='/chat' element={
          <privateRoute>
          <Profile />
          </privateRoute>
        } />
        <Route path='/profile' element={
          <privateRoute>
          <Chat />
          </privateRoute>
        } />
        <Route path="*" element={ <Navigate to="/auth" />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
