import { useState, useContext } from 'react';

import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { AiOutlineSearch } from 'react-icons/ai';

const Search = ({menu}) => {
  
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {
      // setErr(true);
    }

    setUser(null)
    setUsername("")

  };

  return (
    <div>
      <div className="search m-5 border-blue-400">
        <div
          className={
            !menu ? 'serchform p-2 flex items-center gap-2 bg-[#F5F5F5] rounded-[30px]' : 'hidden'
          }
        >

          <AiOutlineSearch size={20}/>
          <input
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKey}
            className="bg-transparent border-none focus:outline-none placeholder:text-gray-400"
            type="text"
            placeholder="Search user.."
            value={username}
          />
        </div>
        {err && <span>User not found</span>}

        {user && (
          <div
            className="userChat p-2 flex items-center mt-2 gap-3 text-[#011627] cursor-pointer hover:bg-[#F5F5F5]"
            onClick={handleSelect}
          >
            <img
              className="w-[45px] h-[45px] object-cover rounded-[50px]"
              src={user.photoURL}
            />
            <div className="userinfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
