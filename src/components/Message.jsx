import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import moment from 'moment';

const Message = ({message}) => {

  const {currentUser} =useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const ref = useRef()

  useEffect(() => {
      ref.current?.scrollIntoView({behavior : "smooth"})   

  } , [message])


  return (
    <div
      className={`message flex gap-2 mb-5 ${
        message.senderId === currentUser.uid && 'owner flex gap-2 mb-2'
      }`}
    >
      <div className="messageInfo flex flex-col text-blue-100  ">
        <img
          className="w-[40px] rounded-[50px] "
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
        />
       
      </div>
      <div className="message-content max-w-[80%] flex flex-col gap-2">
        <p className="bg-white p-2 rounded-r-[15px] rounded-t-[15px] flex items-baseline gap-2 ">
          {message.text} 
          <span className="text-[10px] opacity-[.6] text-right">{moment(message.data.toDate()).startOf('hour').fromNow()}</span>
        </p>
        {message.image && <img className="" src={message.image} />}
      </div>
    </div>
  );
}

export default Message
