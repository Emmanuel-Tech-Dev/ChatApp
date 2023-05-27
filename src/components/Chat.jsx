import  { useContext } from 'react'

import { CiMenuKebab } from 'react-icons/ci';
import { AiOutlineVideoCamera, AiOutlineUserAdd } from 'react-icons/ai';
import Messages from './Messages';
import Input from './Input'
import { ChatContext } from '../context/ChatContext';


const Chat = () => {

  const {data} = useContext(ChatContext)




  return (
    <div className="flex-[2] ">
      <div className="chat">
        <div className="chat-info p-2 h-[50px] flex items-center justify-between bg-[#fff]">
          <div className="profile flex items-center gap-3">
            <img src={data.user?.photoURL} className='w-[30px] h-[30px] rounded-[50px]'/>
             <span className="font-semibold text-blue-950">{data.user?.displayName}</span>
          </div>
         
          <div className="chaticons flex gap-4 ">
            <AiOutlineVideoCamera
              className="cursor-pointer"
              size={20}
              color="#000752"
            />
            <AiOutlineUserAdd
              className="cursor-pointer"
              size={20}
              color="#000752"
            />
            <CiMenuKebab className="cursor-pointer" size={20} color="#000752" />
          </div>
        </div>
        <Messages/>
        <Input/>
      </div>
    </div>
  );
}

export default Chat
