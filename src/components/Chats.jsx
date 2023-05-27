import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = ({ menu }) => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChat = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChat();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  return (
    <div>
      <div className="chats text-[#fefe]  ">
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
              className={
                !menu && chat[1].userInfo
                  ? 'userChat p-2  flex items-center gap-3 text-[#011627] cursor-pointer hover:bg-[#F5F5F5] border-b'
                  : ' hover:bg-[#F5F5F5] flex flex-col items-center border-b text-[#011627] text-[12px] p-2 gap-x-3 text-center'
              }
            >
              <img
                className={
                  chat[1].userInfo?.photoURL
                    ? 'w-[45px] h-[45px] object-cover rounded-[50px]'
                    : 'hidden cursor-none '
                }
                src={chat[1].userInfo?.photoURL}
              />
              <div className="userinfo">
                <span
                  className={
                    chat[1].userInfo?.displayName
                      ? 'font-bold'
                      : 'none cursor-none'
                  }
                >
                  {chat[1].userInfo?.displayName}
                </span>
                <p
                  className={
                    !menu ? 'text-[16px]  text-[#011627]' : 'hidden cursor-none'
                  }
                >
                  {chat[1].lastMessage?.text.slice(0 , 30) + `${'...'}`}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Chats;
