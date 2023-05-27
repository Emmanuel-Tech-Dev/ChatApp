import React, { useState } from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'
import { BiLogOut } from 'react-icons/bi'


const SideBar = () => {

  const [menu , setMenu] = useState(false)

  const handleMenu = ()=> {
    setMenu(!menu)
  }


  return (
    <div
      className={
        !menu
          ? 'flex-[1] relative bg-[#FFFFFF] border-r border-r-[#707991]'
          : 'w-[60px] relative bg-[#FFFFFF] border-r border-r-[#707991]'
      }
    >
      <div className="sidebar ">
        <Navbar handleMenu={handleMenu} menu={menu} />
        <Search menu={menu} />
        <Chats menu={menu} />
        <button
          onClick={() => signOut(auth)}
          className={
            !menu
              ? 'p-2 bg-[#fefe] shadow-md rounded absolute left-3 bottom-3 '
              : 'left-3 bottom-3 absolute p-2 bg-[#fefe] shadow-md rounded'
          }
        >
          <BiLogOut />
        </button>
      </div>
    </div>
  );
}

export default SideBar
