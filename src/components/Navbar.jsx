
import {BiMenu} from 'react-icons/bi'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { IoMdClose } from 'react-icons/io'

const Navbar = ({menu , handleMenu}) => {

   const {currentUser} = useContext(AuthContext)

  return (
    <div>
      <div className="navbar flex items-center h-[50px] justify-between  text-[#fefe] bg-blue-900 p-3">
        <span className={!menu ? 'logo text-xl font-bold' : ' hidden'}>
          ChatTinga
        </span>
        <div className="user flex gap-3 items-center">
          <img
            className={
              !menu ? 'w-[30px] h-[30px] object-cover rounded-[50px]' : 'hidden'
            }
            src={currentUser.photoURL}
          />
          <span className={!menu ? "" : "hidden"}>{currentUser.displayName}</span>

          <button
            onClick={handleMenu}
            className={
              !menu
                ? 'py-1 px-2 rounded bg-blue-400'
                : 'bg-blue-400 py-1 rounded px-2 '
            }
          >
            {!menu ?  <IoMdClose />:<BiMenu /> }
          </button>
        </div>
        {/* <button onClick={() => signOut(auth)} className='p-2 bg-red-600 rounded'>Log Out</button> */}
      </div>
    </div>
  );
}

export default Navbar
