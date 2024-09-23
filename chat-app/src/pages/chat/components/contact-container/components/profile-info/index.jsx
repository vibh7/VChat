import { Avatar,AvatarImage } from '@/components/ui/avatar'
import { getColor } from '@/lib/utils'
import { useAppStore } from '@/store'
import { HOST, LOGOUT_ROUTES } from '@/utils/Constant'
import { TooltipProvider,TooltipTrigger,TooltipContent,Tooltip } from '@/components/ui/tooltip'
import {FiEdit2} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import {IoPowerSharp} from "react-icons/io5"
import apiClient from '@/lib/api-client'
const ProfileInfo = () => {
    const { userInfo,setUserInfo } = useAppStore()
    const navigate = useNavigate()
    const logout = async () =>{
        try {
            const res = await apiClient.post(LOGOUT_ROUTES,
                {},
                {withCredentials:true}
            )
            if(res.status == 200){
                navigate('/auth')
                setUserInfo(null)
            }
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <div className='absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]'>
        <div className='flex gap-3 items-center justify-center'>
            <div className='h-12 w-12 relative'>
            <Avatar className='h-12 w-12 rounded-full overflow-hidden'>
            {
            userInfo.image ? 
                ( <AvatarImage src={`${HOST}/${userInfo.image}`} alt="profile" className="object-cover w-full h-full bg-black"/> ): 
                ( <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}>
                    {userInfo.firstName ? userInfo.firstName.split("").shift() : userInfo.email.split("").shift()}
                </div>
                )
            }
            </Avatar>
            </div>
            <div>
                {userInfo.firstName || userInfo.lastname ? `${userInfo.firstName}` : ""}
            </div>
        </div>
        <div className='flex gap-5'>
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger>
                <FiEdit2 className='text-purple-500 text-xl font-medium' onClick={()=>navigate("/profile")}/>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                <p>Edit Profile</p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger>
                <IoPowerSharp className='text-red-500 text-xl font-medium' onClick={logout}/>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                <p>Logout</p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        </div>
    </div>
  )
}

export default ProfileInfo
