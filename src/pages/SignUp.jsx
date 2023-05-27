import { useState } from 'react';
import avatar from '/images/image 1.png';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-container bg-blue-300 h-[100vh] flex justify-center items-center">
        <div className="form-warapper bg-slate-100 px-10 py-12 rounded">
          <div className="form-header">
            <h1 className="text-center pb-2 text-xl font-bold text-blue-400">
              Welcome to ChatTinga
            </h1>
            <h2 className="text-center pb-5 text-md font-semibold text-blue-700">
              Register
            </h2>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <input
              className="p-2 border-b-2 border-blue-200  bg-transparent  focus:outline-none "
              type="text"
              placeholder="display name"
            />
            <input
              className="p-2 border-b-2 border-blue-200 bg-transparent  focus:outline-none "
              type="email"
              placeholder="email"
            />
            <input
              className="p-2 border-b-2 border-blue-200 bg-transparent   focus:outline-none "
              type="password"
              placeholder="password"
            />
            <input className="p-2 hidden " id="file" type="file" />
            <label
              htmlFor="file"
              className="flex gap-1 items-center cursor-pointer"
            >
              <img className="w-[50px]" src={avatar} />
              <span className="text-blue-400 text-[14px] font-semibold">
                Add Avatar
              </span>
            </label>
            <button
              disabled={loading}
              className="bg-blue-400 text-slate-50 py-2 rounded-sm"
            >
              Sign Up
            </button>
            {loading && <span>please wait...</span>}
            {err && <span>Something went wrong in your auth</span>}
          </form>
          <p className="mt-5 text-center text-gray-500">
            You already have a user account ? <Link to={'/login'}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
